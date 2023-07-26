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
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import * as S from './styled';
import RadioGroupDemo from 'component/radioTest';
import UserImageUpload from 'domains/myPage/component/userImageUpload';
import { useUploadImage } from 'domains/myPage/hooks/useUploadImage';
import studyService from 'service/study_service';

const Mypage = () => {
  const [imageFile, setImageFile] = useState(null);
  const user = useSelector((state) => state.user);
  const uploadUserImage = useUploadImage();
  const { isLoading, data } = useGetUserInfo(user.id);
  const { mutate: updateUserInfo } = useUpdateUserInfo();
  const {
    formState: { isDirty, dirtyFields },
    control,
    handleSubmit,
    register,
    reset,
    getValues,
  } = useForm();

  const onSubmit = async (inputData) => {
    if (!isDirty && !imageFile) return;

    let imageUrl = null;
    if (imageFile) {
      const { preSignedUrl, fileName } = await studyService.getPresignedUrl(user.nickName);
      imageUrl = fileName;
      await uploadUserImage({ preSignedUrl, imageFile, fileName });
    }

    // rhf data to api format
    const urls = data.urls.map((urlData) => {
      const { _id: id } = urlData;
      const urlType = `${id}_type`;
      const urlContent = `${id}_url`;
      if (urlType in inputData)
        return { url: inputData[urlContent], urlType: inputData[urlType].value };
      else return null;
    });

    const submitData = {
      ...(dirtyFields.nickName && { nickName: inputData.nickName }),
      likeLanguages: inputData.likeLanguages.map((lang) => lang.value),
      position: inputData.position.value,
      introduce: inputData.introduce,
      workExperience: inputData.workExperience.value,
      image: imageUrl ?? getValues('image'),
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

    const {
      nickName,
      organizationName,
      introduce,
      workExperience,
      position,
      likeLanguages,
      image,
    } = data;

    const valueTobeUpdated = {
      nickName,
      organizationName,
      introduce,
      workExperience: fotmatToReactSelect(workExperienceOption, workExperience),
      position: fotmatToReactSelect(positionsExceptAllOption, position),
      likeLanguages: fotmatToReactSelect(languageList, likeLanguages),
      image,
      ...urlData,
    };

    reset(valueTobeUpdated);
  }, [data]);

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
        <UserImageUpload
          imageUrl={getValues('image')}
          imageFile={imageFile}
          handleImageChange={(file) => {
            setImageFile(file);
          }}
        />
        <S.Nickname>{user.nickName}님 환영해요.</S.Nickname>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.Group>
            <S.FormItemTitle>
              닉네임 <S.RequiredDot>*</S.RequiredDot>
            </S.FormItemTitle>
            <S.FormInput {...register('nickName')} />
          </S.Group>
          <S.Group>
            <S.FormItemTitle>
              직무 <S.RequiredDot>*</S.RequiredDot>
            </S.FormItemTitle>
            <Controller
              name='position'
              control={control}
              render={({ field }) => {
                return (
                  <Select {...field} styles={customStyles} options={positionsExceptAllOption} />
                );
              }}
            />
          </S.Group>
          <S.Group>
            <S.FormItemTitle>소속</S.FormItemTitle>
            <S.FormInput {...register('organizationName')} />
          </S.Group>
          <S.Group>
            <S.FormItemTitle>
              경력 <S.RequiredDot>*</S.RequiredDot>
            </S.FormItemTitle>
            <Controller
              name='workExperience'
              control={control}
              render={({ field }) => (
                <Select {...field} styles={customStyles} options={workExperienceOption} />
              )}
            />
          </S.Group>

          <S.Group>
            <S.FormItemTitle>자기소개</S.FormItemTitle>
            <S.FormTextArea {...register('introduce')} />
          </S.Group>

          <S.Group>
            <S.FormItemTitle>
              관심스택 <S.RequiredDot>*</S.RequiredDot>
            </S.FormItemTitle>
            <Controller
              name='likeLanguages'
              control={control}
              render={({ field }) => {
                return <Select isMulti styles={customStyles} {...field} options={languageList} />;
              }}
            />
          </S.Group>

          <S.Group>
            <S.FormItemTitle>링크</S.FormItemTitle>
            <S.UrlGroup>
              {data?.urls.map((urlItem) => {
                const { _id: id } = urlItem;

                return (
                  <S.UrlSet key={id}>
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
        {/* <RadioGroupDemo /> */}
      </S.Container>
    </>
  );
};

export default Mypage;
