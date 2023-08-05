import React from 'react';
import { useMediaQuery } from 'react-responsive';
import TrendingDesktop from './desktop';
import TrendingMobile from './mobile';
import { useGetTrending } from 'domains/main/hooks/useGetTrending';

const Trending = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 400px)' });
  const { data: trendings, isLoading } = useGetTrending();

  // const trendings = [
  //   {
  //     language: ['react'],
  //     isClosed: false,
  //     views: 28,
  //     likes: [],
  //     totalLikes: 0,
  //     startDate: '2023-07-24T14:59:00.000Z',
  //     endDate: null,
  //     type: '1',
  //     recruits: '1',
  //     onlineOrOffline: 'off',
  //     contactType: 'ok',
  //     expectedPeriod: '1',
  //     positions: ['FE'],
  //     _id: '64bdfce90f3fc477c08fcaad',
  //     title: '[백엔드 개발자 1명 모집] 내 손안의 여행북 서비스, 《트립북》',
  //     author: {
  //       _id: '648db8ea4d32e3e30b230a86',
  //       image: 'default.PNG',
  //       nickName: '은하철도888',
  //       id: '648db8ea4d32e3e30b230a86',
  //     },
  //     comments: [
  //       {
  //         _id: '64be7ce8aa13dc2536cfe9bb',
  //         content: '댓글 수정했습니다',
  //         author: '64be6ef15557a107df35ebca',
  //         updatedAt: '2023-07-24T13:55:09.472Z',
  //         createdAt: '2023-07-24T13:30:16.516Z',
  //         replies: [],
  //         id: '64be7ce8aa13dc2536cfe9bb',
  //       },
  //       {
  //         _id: '64be82cb4c54152eab0e62ef',
  //         content: '신규 댓글.',
  //         author: '64be6ef15557a107df35ebca',
  //         updatedAt: '2023-07-24T13:55:33.705Z',
  //         createdAt: '2023-07-24T13:55:23.518Z',
  //         replies: [],
  //         id: '64be82cb4c54152eab0e62ef',
  //       },
  //       {
  //         _id: '64c0cd4909d6df07e027fc2b',
  //         content: '2',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:37:45.720Z',
  //         createdAt: '2023-07-26T07:37:45.720Z',
  //         replies: [],
  //         id: '64c0cd4909d6df07e027fc2b',
  //       },
  //       {
  //         _id: '64c0cdbf3a6dbf57ec9bb387',
  //         content: '33',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:39:43.322Z',
  //         createdAt: '2023-07-26T07:39:43.322Z',
  //         replies: [],
  //         id: '64c0cdbf3a6dbf57ec9bb387',
  //       },
  //       {
  //         _id: '64c0ce14ce47cb16a01f40be',
  //         content: 'ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:41:08.628Z',
  //         createdAt: '2023-07-26T07:41:08.628Z',
  //         replies: [],
  //         id: '64c0ce14ce47cb16a01f40be',
  //       },
  //       {
  //         _id: '64c0ced19b77f57e18aad01a',
  //         content: 'ㄹㄴㄹㄹㄹ',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:44:17.128Z',
  //         createdAt: '2023-07-26T07:44:17.128Z',
  //         replies: [],
  //         id: '64c0ced19b77f57e18aad01a',
  //       },
  //     ],
  //     createdAt: '2023-07-24T04:24:09.817Z',
  //     id: '64bdfce90f3fc477c08fcaad',
  //     badge: [],
  //   },
  //   {
  //     language: ['react'],
  //     isClosed: false,
  //     views: 28,
  //     likes: [],
  //     totalLikes: 0,
  //     startDate: '2023-07-24T14:59:00.000Z',
  //     endDate: null,
  //     type: '1',
  //     recruits: '1',
  //     onlineOrOffline: 'off',
  //     contactType: 'ok',
  //     expectedPeriod: '1',
  //     positions: ['FE'],
  //     _id: '64bdfce90f3fc477c08fcaad',
  //     title: '124',
  //     author: {
  //       _id: '648db8ea4d32e3e30b230a86',
  //       image: 'default.PNG',
  //       nickName: '은하철도888',
  //       id: '648db8ea4d32e3e30b230a86',
  //     },
  //     comments: [
  //       {
  //         _id: '64be7ce8aa13dc2536cfe9bb',
  //         content: '댓글 수정했습니다',
  //         author: '64be6ef15557a107df35ebca',
  //         updatedAt: '2023-07-24T13:55:09.472Z',
  //         createdAt: '2023-07-24T13:30:16.516Z',
  //         replies: [],
  //         id: '64be7ce8aa13dc2536cfe9bb',
  //       },
  //       {
  //         _id: '64be82cb4c54152eab0e62ef',
  //         content: '신규 댓글.',
  //         author: '64be6ef15557a107df35ebca',
  //         updatedAt: '2023-07-24T13:55:33.705Z',
  //         createdAt: '2023-07-24T13:55:23.518Z',
  //         replies: [],
  //         id: '64be82cb4c54152eab0e62ef',
  //       },
  //       {
  //         _id: '64c0cd4909d6df07e027fc2b',
  //         content: '2',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:37:45.720Z',
  //         createdAt: '2023-07-26T07:37:45.720Z',
  //         replies: [],
  //         id: '64c0cd4909d6df07e027fc2b',
  //       },
  //       {
  //         _id: '64c0cdbf3a6dbf57ec9bb387',
  //         content: '33',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:39:43.322Z',
  //         createdAt: '2023-07-26T07:39:43.322Z',
  //         replies: [],
  //         id: '64c0cdbf3a6dbf57ec9bb387',
  //       },
  //       {
  //         _id: '64c0ce14ce47cb16a01f40be',
  //         content: 'ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:41:08.628Z',
  //         createdAt: '2023-07-26T07:41:08.628Z',
  //         replies: [],
  //         id: '64c0ce14ce47cb16a01f40be',
  //       },
  //       {
  //         _id: '64c0ced19b77f57e18aad01a',
  //         content: 'ㄹㄴㄹㄹㄹ',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:44:17.128Z',
  //         createdAt: '2023-07-26T07:44:17.128Z',
  //         replies: [],
  //         id: '64c0ced19b77f57e18aad01a',
  //       },
  //     ],
  //     createdAt: '2023-07-24T04:24:09.817Z',
  //     id: '64bdfce90f3fc477c08fcaad',
  //     badge: [],
  //   },
  //   {
  //     language: ['react'],
  //     isClosed: false,
  //     views: 28,
  //     likes: [],
  //     totalLikes: 0,
  //     startDate: '2023-07-24T14:59:00.000Z',
  //     endDate: null,
  //     type: '1',
  //     recruits: '1',
  //     onlineOrOffline: 'off',
  //     contactType: 'ok',
  //     expectedPeriod: '1',
  //     positions: ['FE'],
  //     _id: '64bdfce90f3fc477c08fcaad',
  //     title: '124',
  //     author: {
  //       _id: '648db8ea4d32e3e30b230a86',
  //       image: 'default.PNG',
  //       nickName: '은하철도888',
  //       id: '648db8ea4d32e3e30b230a86',
  //     },
  //     comments: [
  //       {
  //         _id: '64be7ce8aa13dc2536cfe9bb',
  //         content: '댓글 수정했습니다',
  //         author: '64be6ef15557a107df35ebca',
  //         updatedAt: '2023-07-24T13:55:09.472Z',
  //         createdAt: '2023-07-24T13:30:16.516Z',
  //         replies: [],
  //         id: '64be7ce8aa13dc2536cfe9bb',
  //       },
  //       {
  //         _id: '64be82cb4c54152eab0e62ef',
  //         content: '신규 댓글.',
  //         author: '64be6ef15557a107df35ebca',
  //         updatedAt: '2023-07-24T13:55:33.705Z',
  //         createdAt: '2023-07-24T13:55:23.518Z',
  //         replies: [],
  //         id: '64be82cb4c54152eab0e62ef',
  //       },
  //       {
  //         _id: '64c0cd4909d6df07e027fc2b',
  //         content: '2',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:37:45.720Z',
  //         createdAt: '2023-07-26T07:37:45.720Z',
  //         replies: [],
  //         id: '64c0cd4909d6df07e027fc2b',
  //       },
  //       {
  //         _id: '64c0cdbf3a6dbf57ec9bb387',
  //         content: '33',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:39:43.322Z',
  //         createdAt: '2023-07-26T07:39:43.322Z',
  //         replies: [],
  //         id: '64c0cdbf3a6dbf57ec9bb387',
  //       },
  //       {
  //         _id: '64c0ce14ce47cb16a01f40be',
  //         content: 'ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:41:08.628Z',
  //         createdAt: '2023-07-26T07:41:08.628Z',
  //         replies: [],
  //         id: '64c0ce14ce47cb16a01f40be',
  //       },
  //       {
  //         _id: '64c0ced19b77f57e18aad01a',
  //         content: 'ㄹㄴㄹㄹㄹ',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:44:17.128Z',
  //         createdAt: '2023-07-26T07:44:17.128Z',
  //         replies: [],
  //         id: '64c0ced19b77f57e18aad01a',
  //       },
  //     ],
  //     createdAt: '2023-07-24T04:24:09.817Z',
  //     id: '64bdfce90f3fc477c08fcaad',
  //     badge: [],
  //   },
  //   {
  //     language: ['react'],
  //     isClosed: false,
  //     views: 28,
  //     likes: [],
  //     totalLikes: 0,
  //     startDate: '2023-07-24T14:59:00.000Z',
  //     endDate: null,
  //     type: '1',
  //     recruits: '1',
  //     onlineOrOffline: 'off',
  //     contactType: 'ok',
  //     expectedPeriod: '1',
  //     positions: ['FE'],
  //     _id: '64bdfce90f3fc477c08fcaad',
  //     title: '124',
  //     author: {
  //       _id: '648db8ea4d32e3e30b230a86',
  //       image: 'default.PNG',
  //       nickName: '은하철도888',
  //       id: '648db8ea4d32e3e30b230a86',
  //     },
  //     comments: [
  //       {
  //         _id: '64be7ce8aa13dc2536cfe9bb',
  //         content: '댓글 수정했습니다',
  //         author: '64be6ef15557a107df35ebca',
  //         updatedAt: '2023-07-24T13:55:09.472Z',
  //         createdAt: '2023-07-24T13:30:16.516Z',
  //         replies: [],
  //         id: '64be7ce8aa13dc2536cfe9bb',
  //       },
  //       {
  //         _id: '64be82cb4c54152eab0e62ef',
  //         content: '신규 댓글.',
  //         author: '64be6ef15557a107df35ebca',
  //         updatedAt: '2023-07-24T13:55:33.705Z',
  //         createdAt: '2023-07-24T13:55:23.518Z',
  //         replies: [],
  //         id: '64be82cb4c54152eab0e62ef',
  //       },
  //       {
  //         _id: '64c0cd4909d6df07e027fc2b',
  //         content: '2',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:37:45.720Z',
  //         createdAt: '2023-07-26T07:37:45.720Z',
  //         replies: [],
  //         id: '64c0cd4909d6df07e027fc2b',
  //       },
  //       {
  //         _id: '64c0cdbf3a6dbf57ec9bb387',
  //         content: '33',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:39:43.322Z',
  //         createdAt: '2023-07-26T07:39:43.322Z',
  //         replies: [],
  //         id: '64c0cdbf3a6dbf57ec9bb387',
  //       },
  //       {
  //         _id: '64c0ce14ce47cb16a01f40be',
  //         content: 'ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:41:08.628Z',
  //         createdAt: '2023-07-26T07:41:08.628Z',
  //         replies: [],
  //         id: '64c0ce14ce47cb16a01f40be',
  //       },
  //       {
  //         _id: '64c0ced19b77f57e18aad01a',
  //         content: 'ㄹㄴㄹㄹㄹ',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:44:17.128Z',
  //         createdAt: '2023-07-26T07:44:17.128Z',
  //         replies: [],
  //         id: '64c0ced19b77f57e18aad01a',
  //       },
  //     ],
  //     createdAt: '2023-07-24T04:24:09.817Z',
  //     id: '64bdfce90f3fc477c08fcaad',
  //     badge: [],
  //   },
  //   {
  //     language: ['react'],
  //     isClosed: false,
  //     views: 28,
  //     likes: [],
  //     totalLikes: 0,
  //     startDate: '2023-07-24T14:59:00.000Z',
  //     endDate: null,
  //     type: '1',
  //     recruits: '1',
  //     onlineOrOffline: 'off',
  //     contactType: 'ok',
  //     expectedPeriod: '1',
  //     positions: ['FE'],
  //     _id: '64bdfce90f3fc477c08fcaad',
  //     title: '124',
  //     author: {
  //       _id: '648db8ea4d32e3e30b230a86',
  //       image: 'default.PNG',
  //       nickName: '은하철도888',
  //       id: '648db8ea4d32e3e30b230a86',
  //     },
  //     comments: [
  //       {
  //         _id: '64be7ce8aa13dc2536cfe9bb',
  //         content: '댓글 수정했습니다',
  //         author: '64be6ef15557a107df35ebca',
  //         updatedAt: '2023-07-24T13:55:09.472Z',
  //         createdAt: '2023-07-24T13:30:16.516Z',
  //         replies: [],
  //         id: '64be7ce8aa13dc2536cfe9bb',
  //       },
  //       {
  //         _id: '64be82cb4c54152eab0e62ef',
  //         content: '신규 댓글.',
  //         author: '64be6ef15557a107df35ebca',
  //         updatedAt: '2023-07-24T13:55:33.705Z',
  //         createdAt: '2023-07-24T13:55:23.518Z',
  //         replies: [],
  //         id: '64be82cb4c54152eab0e62ef',
  //       },
  //       {
  //         _id: '64c0cd4909d6df07e027fc2b',
  //         content: '2',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:37:45.720Z',
  //         createdAt: '2023-07-26T07:37:45.720Z',
  //         replies: [],
  //         id: '64c0cd4909d6df07e027fc2b',
  //       },
  //       {
  //         _id: '64c0cdbf3a6dbf57ec9bb387',
  //         content: '33',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:39:43.322Z',
  //         createdAt: '2023-07-26T07:39:43.322Z',
  //         replies: [],
  //         id: '64c0cdbf3a6dbf57ec9bb387',
  //       },
  //       {
  //         _id: '64c0ce14ce47cb16a01f40be',
  //         content: 'ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:41:08.628Z',
  //         createdAt: '2023-07-26T07:41:08.628Z',
  //         replies: [],
  //         id: '64c0ce14ce47cb16a01f40be',
  //       },
  //       {
  //         _id: '64c0ced19b77f57e18aad01a',
  //         content: 'ㄹㄴㄹㄹㄹ',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:44:17.128Z',
  //         createdAt: '2023-07-26T07:44:17.128Z',
  //         replies: [],
  //         id: '64c0ced19b77f57e18aad01a',
  //       },
  //     ],
  //     createdAt: '2023-07-24T04:24:09.817Z',
  //     id: '64bdfce90f3fc477c08fcaad',
  //     badge: [],
  //   },
  //   {
  //     language: ['react'],
  //     isClosed: false,
  //     views: 28,
  //     likes: [],
  //     totalLikes: 0,
  //     startDate: '2023-07-24T14:59:00.000Z',
  //     endDate: null,
  //     type: '1',
  //     recruits: '1',
  //     onlineOrOffline: 'off',
  //     contactType: 'ok',
  //     expectedPeriod: '1',
  //     positions: ['FE'],
  //     _id: '64bdfce90f3fc477c08fcaad',
  //     title: '124',
  //     author: {
  //       _id: '648db8ea4d32e3e30b230a86',
  //       image: 'default.PNG',
  //       nickName: '은하철도888',
  //       id: '648db8ea4d32e3e30b230a86',
  //     },
  //     comments: [
  //       {
  //         _id: '64be7ce8aa13dc2536cfe9bb',
  //         content: '댓글 수정했습니다',
  //         author: '64be6ef15557a107df35ebca',
  //         updatedAt: '2023-07-24T13:55:09.472Z',
  //         createdAt: '2023-07-24T13:30:16.516Z',
  //         replies: [],
  //         id: '64be7ce8aa13dc2536cfe9bb',
  //       },
  //       {
  //         _id: '64be82cb4c54152eab0e62ef',
  //         content: '신규 댓글.',
  //         author: '64be6ef15557a107df35ebca',
  //         updatedAt: '2023-07-24T13:55:33.705Z',
  //         createdAt: '2023-07-24T13:55:23.518Z',
  //         replies: [],
  //         id: '64be82cb4c54152eab0e62ef',
  //       },
  //       {
  //         _id: '64c0cd4909d6df07e027fc2b',
  //         content: '2',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:37:45.720Z',
  //         createdAt: '2023-07-26T07:37:45.720Z',
  //         replies: [],
  //         id: '64c0cd4909d6df07e027fc2b',
  //       },
  //       {
  //         _id: '64c0cdbf3a6dbf57ec9bb387',
  //         content: '33',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:39:43.322Z',
  //         createdAt: '2023-07-26T07:39:43.322Z',
  //         replies: [],
  //         id: '64c0cdbf3a6dbf57ec9bb387',
  //       },
  //       {
  //         _id: '64c0ce14ce47cb16a01f40be',
  //         content: 'ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:41:08.628Z',
  //         createdAt: '2023-07-26T07:41:08.628Z',
  //         replies: [],
  //         id: '64c0ce14ce47cb16a01f40be',
  //       },
  //       {
  //         _id: '64c0ced19b77f57e18aad01a',
  //         content: 'ㄹㄴㄹㄹㄹ',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:44:17.128Z',
  //         createdAt: '2023-07-26T07:44:17.128Z',
  //         replies: [],
  //         id: '64c0ced19b77f57e18aad01a',
  //       },
  //     ],
  //     createdAt: '2023-07-24T04:24:09.817Z',
  //     id: '64bdfce90f3fc477c08fcaad',
  //     badge: [],
  //   },
  //   {
  //     language: ['react'],
  //     isClosed: false,
  //     views: 28,
  //     likes: [],
  //     totalLikes: 0,
  //     startDate: '2023-07-24T14:59:00.000Z',
  //     endDate: null,
  //     type: '1',
  //     recruits: '1',
  //     onlineOrOffline: 'off',
  //     contactType: 'ok',
  //     expectedPeriod: '1',
  //     positions: ['FE'],
  //     _id: '64bdfce90f3fc477c08fcaad',
  //     title: '124',
  //     author: {
  //       _id: '648db8ea4d32e3e30b230a86',
  //       image: 'default.PNG',
  //       nickName: '은하철도888',
  //       id: '648db8ea4d32e3e30b230a86',
  //     },
  //     comments: [
  //       {
  //         _id: '64be7ce8aa13dc2536cfe9bb',
  //         content: '댓글 수정했습니다',
  //         author: '64be6ef15557a107df35ebca',
  //         updatedAt: '2023-07-24T13:55:09.472Z',
  //         createdAt: '2023-07-24T13:30:16.516Z',
  //         replies: [],
  //         id: '64be7ce8aa13dc2536cfe9bb',
  //       },
  //       {
  //         _id: '64be82cb4c54152eab0e62ef',
  //         content: '신규 댓글.',
  //         author: '64be6ef15557a107df35ebca',
  //         updatedAt: '2023-07-24T13:55:33.705Z',
  //         createdAt: '2023-07-24T13:55:23.518Z',
  //         replies: [],
  //         id: '64be82cb4c54152eab0e62ef',
  //       },
  //       {
  //         _id: '64c0cd4909d6df07e027fc2b',
  //         content: '2',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:37:45.720Z',
  //         createdAt: '2023-07-26T07:37:45.720Z',
  //         replies: [],
  //         id: '64c0cd4909d6df07e027fc2b',
  //       },
  //       {
  //         _id: '64c0cdbf3a6dbf57ec9bb387',
  //         content: '33',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:39:43.322Z',
  //         createdAt: '2023-07-26T07:39:43.322Z',
  //         replies: [],
  //         id: '64c0cdbf3a6dbf57ec9bb387',
  //       },
  //       {
  //         _id: '64c0ce14ce47cb16a01f40be',
  //         content: 'ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:41:08.628Z',
  //         createdAt: '2023-07-26T07:41:08.628Z',
  //         replies: [],
  //         id: '64c0ce14ce47cb16a01f40be',
  //       },
  //       {
  //         _id: '64c0ced19b77f57e18aad01a',
  //         content: 'ㄹㄴㄹㄹㄹ',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:44:17.128Z',
  //         createdAt: '2023-07-26T07:44:17.128Z',
  //         replies: [],
  //         id: '64c0ced19b77f57e18aad01a',
  //       },
  //     ],
  //     createdAt: '2023-07-24T04:24:09.817Z',
  //     id: '64bdfce90f3fc477c08fcaad',
  //     badge: [],
  //   },
  //   {
  //     language: ['react'],
  //     isClosed: false,
  //     views: 28,
  //     likes: [],
  //     totalLikes: 0,
  //     startDate: '2023-07-24T14:59:00.000Z',
  //     endDate: null,
  //     type: '1',
  //     recruits: '1',
  //     onlineOrOffline: 'off',
  //     contactType: 'ok',
  //     expectedPeriod: '1',
  //     positions: ['FE'],
  //     _id: '64bdfce90f3fc477c08fcaad',
  //     title: '124',
  //     author: {
  //       _id: '648db8ea4d32e3e30b230a86',
  //       image: 'default.PNG',
  //       nickName: '은하철도888',
  //       id: '648db8ea4d32e3e30b230a86',
  //     },
  //     comments: [
  //       {
  //         _id: '64be7ce8aa13dc2536cfe9bb',
  //         content: '댓글 수정했습니다',
  //         author: '64be6ef15557a107df35ebca',
  //         updatedAt: '2023-07-24T13:55:09.472Z',
  //         createdAt: '2023-07-24T13:30:16.516Z',
  //         replies: [],
  //         id: '64be7ce8aa13dc2536cfe9bb',
  //       },
  //       {
  //         _id: '64be82cb4c54152eab0e62ef',
  //         content: '신규 댓글.',
  //         author: '64be6ef15557a107df35ebca',
  //         updatedAt: '2023-07-24T13:55:33.705Z',
  //         createdAt: '2023-07-24T13:55:23.518Z',
  //         replies: [],
  //         id: '64be82cb4c54152eab0e62ef',
  //       },
  //       {
  //         _id: '64c0cd4909d6df07e027fc2b',
  //         content: '2',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:37:45.720Z',
  //         createdAt: '2023-07-26T07:37:45.720Z',
  //         replies: [],
  //         id: '64c0cd4909d6df07e027fc2b',
  //       },
  //       {
  //         _id: '64c0cdbf3a6dbf57ec9bb387',
  //         content: '33',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:39:43.322Z',
  //         createdAt: '2023-07-26T07:39:43.322Z',
  //         replies: [],
  //         id: '64c0cdbf3a6dbf57ec9bb387',
  //       },
  //       {
  //         _id: '64c0ce14ce47cb16a01f40be',
  //         content: 'ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:41:08.628Z',
  //         createdAt: '2023-07-26T07:41:08.628Z',
  //         replies: [],
  //         id: '64c0ce14ce47cb16a01f40be',
  //       },
  //       {
  //         _id: '64c0ced19b77f57e18aad01a',
  //         content: 'ㄹㄴㄹㄹㄹ',
  //         author: '648db8ea4d32e3e30b230a86',
  //         updatedAt: '2023-07-26T07:44:17.128Z',
  //         createdAt: '2023-07-26T07:44:17.128Z',
  //         replies: [],
  //         id: '64c0ced19b77f57e18aad01a',
  //       },
  //     ],
  //     createdAt: '2023-07-24T04:24:09.817Z',
  //     id: '64bdfce90f3fc477c08fcaad',
  //     badge: [],
  //   },
  //   {
  //     language: ['react'],
  //     isClosed: false,
  //     views: 24,
  //     likes: [],
  //     totalLikes: 0,
  //     startDate: '2023-07-27T23:00:12.000Z',
  //     endDate: null,
  //     type: '1',
  //     recruits: '2',
  //     onlineOrOffline: 'on',
  //     contactType: 'ok',
  //     expectedPeriod: '3',
  //     positions: ['BE'],
  //     _id: '64be012194b3593f58bffcff',
  //     title: 'asdfasdf',
  //     author: {
  //       _id: '648db8ea4d32e3e30b230a86',
  //       image: 'default.PNG',
  //       nickName: '은하철도888',
  //       id: '648db8ea4d32e3e30b230a86',
  //     },
  //     comments: [
  //       {
  //         _id: '64be720dfabf4611da411e30',
  //         content: 'aaaㅁㅁㅁㅁㅁㅁㅁㅁㅁ',
  //         author: '64be6ef15557a107df35ebca',
  //         updatedAt: '2023-07-24T12:43:57.189Z',
  //         createdAt: '2023-07-24T12:43:57.189Z',
  //         replies: [],
  //         id: '64be720dfabf4611da411e30',
  //       },
  //       {
  //         _id: '64be77cc4ae0281d916127b5',
  //         content: 'asdfasdfasdfa',
  //         author: '64be6ef15557a107df35ebca',
  //         updatedAt: '2023-07-24T13:08:28.719Z',
  //         createdAt: '2023-07-24T13:08:28.719Z',
  //         replies: [],
  //         id: '64be77cc4ae0281d916127b5',
  //       },
  //     ],
  //     createdAt: '2023-07-24T04:42:09.139Z',
  //     id: '64be012194b3593f58bffcff',
  //     badge: [],
  //   },
  // ];

  if (isLoading) return <></>;

  return isMobile ? (
    <TrendingMobile trendings={trendings} />
  ) : (
    <TrendingDesktop trendings={trendings} />
  );
};

export default Trending;
