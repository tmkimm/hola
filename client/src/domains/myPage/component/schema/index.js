import z from 'zod';

export const selectSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const urlSchema = z.object({
  url: z.string().regex(/^https:\/\//, {
    message: '유효한 링크를 입력해주세요',
  }),
  urlType: selectSchema,
});

export const validationSchema = z.object({
  nickName: z
    .string()
    .min(1, { message: '닉네임은 최소 1자 이상이어야 합니다.' })
    .max(15, { message: '닉네임은 최대 15자까지 가능합니다.' }),
  likeLanguages: z.array(selectSchema).min(1, { message: '하나 이상의 스택을 선택해주세요.' }),
  organizationName: z.string(),
  organizationIsOpen: z.boolean(),
  introduce: z.string(),
  position: selectSchema,
  workExperience: selectSchema,
  urls: z.array(urlSchema),
});
