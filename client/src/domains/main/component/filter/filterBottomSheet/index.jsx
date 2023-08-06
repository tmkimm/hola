import 'react-spring-bottom-sheet/dist/style.css';
import * as S from './styled';
import Languagelist from './languageList';

const FilterBottomSheet = ({ isOpen, onDismiss, curCategory, setCurCategory }) => {
  const categories = ['기술스택', '모집구분', '포지션', '진행방식', '마감여부'];

  return (
    <S.Popup expandOnContentDrag={true} open={isOpen} onDismiss={onDismiss}>
      <S.Container>
        <S.Categories>
          {categories.map((category) => (
            <S.CategoryItem
              onClick={() => setCurCategory(category)}
              selected={category === curCategory}
            >
              {category}
            </S.CategoryItem>
          ))}
        </S.Categories>
        <Languagelist />
        <S.ButtonContainer>
          <S.InitButton>초기화</S.InitButton>
          <S.ConfirmButton>필터 적용</S.ConfirmButton>
        </S.ButtonContainer>
      </S.Container>
    </S.Popup>
  );
};

export default FilterBottomSheet;
