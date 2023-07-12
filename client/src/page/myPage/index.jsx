import {
  languageList,
  positionsExceptAllOption,
  urlOption,
  workExperienceOption,
} from 'common/options';
import Navbar from 'component/nav_bar/navbar';
import CustomOption from 'domains/myPage/component/customOption';
import { useGetUserInfo } from 'domains/myPage/hooks/useGetUserInfo';
import { useUpdateUserInfo } from 'domains/myPage/hooks/useUpdateUserInfo';
import { fotmatToReactSelect } from 'common/utils/formatToReactSelect';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import * as S from './styled';

const Mypage = () => {
  const user = useSelector((state) => state.user);

  const { isLoading, data } = useGetUserInfo(user.id);
  const { mutate: updateUserInfo } = useUpdateUserInfo();

  const { control, handleSubmit, register, reset } = useForm();
  const onSubmit = (inputData) => {
    // rhf data to api format
    const urls = data.urls.map((urlData) => {
      const { _id: id } = urlData;
      const key = `${id}_type`;
      const key2 = `${id}_url`;
      if (key in inputData) return { url: inputData[key2], urlType: inputData[key].value };
      else return null;
    });

    const submitData = {
      likeLanguages: inputData.likeLanguages.map((lang) => lang.value),
      position: inputData.position.value,
      introduce: inputData.introduce,
      workExperience: inputData.workExperience.value,
      urls,
    };

    updateUserInfo({ id: user.id, userData: submitData });
  };

  useEffect(() => {
    if (isLoading) return;
    // api format to rhf
    const urlData = data?.urls.reduce((acc, urlData) => {
      const { _id: id, urlType, url } = urlData;
      const urlKey = `${id}_url`;
      const urlTypeKey = `${id}_type`;
      return { ...acc, [urlKey]: url, [urlTypeKey]: fotmatToReactSelect(urlOption, urlType) };
    }, {});

    const { nickName, organizationName, introduce, workExperience, position, likeLanguages } = data;

    const valueTobeUpdated = {
      nickName,
      organizationName,
      introduce,
      workExperience: fotmatToReactSelect(workExperienceOption, workExperience),
      position: fotmatToReactSelect(positionsExceptAllOption, position),
      likeLanguages: fotmatToReactSelect(languageList, likeLanguages),
      ...urlData,
    };

    reset(valueTobeUpdated);
  }, [reset, data]);

  const customStyles = {
    control: (css) => ({
      ...css,
      maxWidth: '500px',
      width: '100%',
      minHeight: '3rem',
    }),
  };

  const customStyles2 = {
    control: (css) => ({
      ...css,
      width: '340px',
      minHeight: '3rem',
    }),
  };
  if (isLoading) return <></>;
  return (
    <>
      <Navbar />

      <S.Container>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.Group>
            <div>닉네임</div>
            <S.CustomInput {...register('nickName')} />
          </S.Group>
          <S.Group>
            <div>회사</div>
            <S.CustomInput {...register('organizationName')} />
          </S.Group>
          <S.Group>
            <div>경력</div>
            <Controller
              name='workExperience'
              control={control}
              render={({ field }) => (
                <Select {...field} styles={customStyles} options={workExperienceOption} />
              )}
            />
          </S.Group>

          <S.Group>
            <div>직무</div>
            <Controller
              name='position'
              control={control}
              render={({ field }) => {
                // console.log('field : ', field);
                return (
                  <Select {...field} styles={customStyles} options={positionsExceptAllOption} />
                );
              }}
            />
          </S.Group>

          <S.Group>
            <div>한줄 소개</div>
            <S.CustomTextArea {...register('introduce')} />
          </S.Group>

          <S.Group>
            <div>관심 스택</div>
            <Controller
              name='likeLanguages'
              control={control}
              render={({ field }) => (
                <Select isMulti styles={customStyles} {...field} options={languageList} />
              )}
            />
          </S.Group>

          <S.Group>
            <div>링크</div>
            <S.UrlGroup>
              {data?.urls.map((urlItem) => {
                const { _id: id, urlType, url } = urlItem;
                //console.log(id, urlType, url);
                return (
                  <S.UrlSet>
                    <input {...register(`${id}_url`)} />
                    <Controller
                      name={`${id}_type`}
                      control={control}
                      render={({ field }) => (
                        <Select
                          styles={customStyles2}
                          components={{ Option: CustomOption }}
                          {...field}
                          options={urlOption}
                        />
                      )}
                    />
                  </S.UrlSet>
                );
              })}
            </S.UrlGroup>
            <S.AddButton>+ 추가</S.AddButton>
          </S.Group>
          <S.Button type='submit' />
        </S.Form>
      </S.Container>
    </>
  );
};

export default Mypage;
