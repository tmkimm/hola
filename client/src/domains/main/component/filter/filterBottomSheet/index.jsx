import 'react-spring-bottom-sheet/dist/style.css';
import * as S from './styled';
import LanguageFilter from './languageFilter';
import StudyTypeFilter from './studyTypeFilter';
import PositionFilter from './positionFilter';
import { useDispatch } from 'react-redux';
import { initLanguage } from 'store/language';
import OnOfflineFilter from './onOfflineFilter';
import IsClosedFilter from './isClosedFilter';

const FilterBottomSheet = ({ isOpen, onDismiss, curCategory, setCurCategory }) => {
  const dispatch = useDispatch();
  const categories = ['기술스택', '모집구분', '포지션', '진행방식', '마감여부'];
  const FilterItem = {
    기술스택: <LanguageFilter />,
    모집구분: <StudyTypeFilter />,
    포지션: <PositionFilter />,
    진행방식: <OnOfflineFilter />,
    마감여부: <IsClosedFilter />,
  };

  return (
    /* ios에서 bottom sheet background가 click 되는 이슈가 있어 click event 전파를 막습니다.
       @see https://github.com/stipsan/react-spring-bottom-sheet/issues/180 */
    <S.Popup
      expandOnContentDrag={true}
      open={isOpen}
      onDismiss={onDismiss}
      sibling={
        <div
          data-rsbs-backdrop='true'
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onDismiss();
          }}
        />
      }
      blocking={false}
    >
      <S.Container>
        <S.Categories>
          {categories.map((category, idx) => (
            <S.CategoryItem
              key={idx}
              onClick={() => setCurCategory(category)}
              selected={category === curCategory}
            >
              {category}
            </S.CategoryItem>
          ))}
        </S.Categories>
        {FilterItem[curCategory]}
        <S.ButtonContainer>
          <S.InitButton
            onClick={() => {
              dispatch(initLanguage());
            }}
          >
            초기화
          </S.InitButton>
          <S.ConfirmButton onClick={onDismiss}>필터 적용</S.ConfirmButton>
        </S.ButtonContainer>
      </S.Container>
    </S.Popup>
  );
};

export default FilterBottomSheet;
