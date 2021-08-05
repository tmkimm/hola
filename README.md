<div align="center">
<img alt="DEV" src="https://user-images.githubusercontent.com/60312656/128198525-f46458a2-5678-4470-a968-d008c0bfc706.png" width="700px">
</div>

## 🙆🏻‍♀️ 스터디, 사이드 프로젝트 팀원을 구하는 가장 쉬운 방법

혼자 만드는 게시판과 투두리스트가 지겨우신가요?

사이드 프로젝트는 해보고싶은데 어떻게 해야할지 모르겠나요?

## 🙆🏿‍♂️ Hola에서 나와 비슷한 사람을 찾으세요!

스터디, 모각코, 사이드 프로젝트 등 함께하고 싶은 개발자를 [Hola!](http://holaworld.io)에서 찾으세요.

원하는 기술을 선택해서 쉽게 팀원을 찾을 수 있어요.

---
## 📺 [Homepage](http://holaworld.io)

## 📒 목차
- [소개](#-소개)
- [기술스택](#-기술스택)
- [아키텍처](#-아키텍처)
- [Refresh Token과 Sliding Sessions을 활용한 JWT 보안 전략](#-Refresh)

## 🔖 소개

**Hola**는 개발자들을 위한 플랫폼으로, 모든 개발자가 스터디 및 사이드 프로젝트를 진행할 동료를 쉽게 구할 수 있도록 플랫폼을 제공합니다.🎉

## 📚 기술스택

| 분야           | 사용 기술                       | 비고 |
| -------------- | ------------------------------- | ---- |
| FrontEnd       | React, styled-components        |
| BackEnd        | Express                         |
| Database       | MongoDB(Mongoose)               |
| Cloud Services | AWS EC2, AWS Cloudfront, AWS S3 |
| TOOL           | VSCODE, Notion, Slack           |
| DESIGN         | Figma                           |

## 아키텍처

![image](https://user-images.githubusercontent.com/60312656/128197772-74ae852d-1314-4c11-bfa4-69f6ccee6b06.png)


## 🔖 API 명세서

- https://documenter.getpostman.com/view/12851774/TVzSiwv1

## Refresh Token과 Sliding Sessions을 활용한 JWT 보안 전략
Hola!에서는 Stateless한 서비스를 만들기 위해 JWT를 사용하고 있습니다.

### AccessToken의 단점
로그인을 할 때 클라이언트에게 Access Token을 발급합니다. 서버는 Token을 별도의 저장소에 저장할 필요 없이 비밀키를 이용해 비교하는 것만으로 인증을 처리할 수 있습니다. 하지만 특정 사용자의 Access Token이 탈취되었다고 판단된 경우 강제로 만료시킬 방법이 없기때문에 만료 시간을 짧게 설정해야만 하고, 이로 인해 사용자는 자주 로그인을 해야 한다는 단점이 있습니다.

### 🐇 보안성과 편의성 모두 잡을 수 없을까?
결제나 개인 정보처럼 중요한 콘텐츠를 다루고 있다면 비밀번호를 한번 더 입력하는 것은 문제가 되지 않지만 글을 작성할때마다 비밀번호를 입력해야 한다면 사용자들은 매우 귀찮음을 느낄것입니다.
보안성과 사용자의 편의성을 모두 잡기 위해 Access Token과 함께 Refresh Token을 사용하는 전략을 선택했습니다.
Access Token의 만료 기간을 짧게 설정할 수 있기 때문에 탈취되더라도 제한된 기간만 접근이 가능하고 사용자는 Refresh Token이 만료되었을 경우에만 다시 로그인을 하면됩니다.

### 처리과정
1. 로그인 시 서버는 Access Token과 긴 만료 시간을 갖는 Refresh Token을 발급합니다.
2. 클라이언트는 발급받은 Refresh Token을 secure, httpOnly 쿠키로 저장합니다.
3. 클라이언트는 Access Token이 만료되었다는 응답을 받으면 Refresh Token을 이용하여 Access Token의 재발급을 요청합니다.
4. 서버는 Refresh Token이 유효할 경우 Access Token을 발급하고 만료되었을 경우 다시 로그인 해야함을 응답합니다.
5. 클라이언트는 Refresh Token이 만료되었다는 응답을 받으면 사용자에게 로그인을 요청합니다.
