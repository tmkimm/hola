import * as S from './styled';
import Category from '../filter/category/Category';
import LanguageBar from 'component/languageIBar/LanguageBar';
import SelectedLanguage from '../filter/selectedLanguage/SelectedLanguage';
import { useSelector } from 'react-redux';
import { capitalize } from 'common/utils';

const LanguageSelect = () => {
  const selected = useSelector((state) => state.language.selected);

  return (
    <S.PopoverContainer>
      <S.PopoverButton isSelected={selected.length !== 0}>
        <S.Languages>
          {selected.length === 0
            ? '기술 스택'
            : selected.map((lang) => capitalize(lang)).join(', ')}
        </S.Languages>
        <svg height='20' width='20' viewBox='0 0 20 20' aria-hidden='true' focusable='false'>
          <path
            fill='#cccccc'
            d='M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z'
          ></path>
        </svg>
      </S.PopoverButton>

      <S.PopoverPanel>
        <Category />
        <LanguageBar />
        <SelectedLanguage />
      </S.PopoverPanel>
    </S.PopoverContainer>
  );
};

export default LanguageSelect;
