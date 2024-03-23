import React from 'react';
import * as S from './styled';

const OrginazationRadioGroup = React.forwardRef((props, ref) => {
  const { value, onChange } = props;

  return (
    <S.RadioGroups value={value ?? false} onChange={onChange} ref={ref}>
      <S.RadioOptions value={true}>
        {({ checked }) => {
          return (
            <>
              {checked ? <S.Checked src='/images/info/selected.png' /> : <S.UnChecked />}
              <S.Text checked={checked}>공개</S.Text>
            </>
          );
        }}
      </S.RadioOptions>
      <S.RadioOptions value={false}>
        {({ checked }) => {
          return (
            <>
              {checked ? <S.Checked src='/images/info/selected.png' /> : <S.UnChecked />}
              <S.Text checked={checked}>비공개</S.Text>
            </>
          );
        }}
      </S.RadioOptions>
    </S.RadioGroups>
  );
});

export default OrginazationRadioGroup;
