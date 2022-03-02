export const initialState = {
  mainPosts: [
    {
      id: 1,
      me: {
        id: 1,
        nickname: 'kimpm',
      },
      content: '첫 번째 게시글 #고양이 #사막여우 #수달',
      Images: [
        {
          src: 'https://url.kr/v4zq1y',
        },
        {
          src: 'https://url.kr/3972kr',
        },
        {
          src: 'https://url.kr/urvxlc',
        },
      ],
      Comments: [
        {
          User: {
            nickname: 'nero',
          },
          content: '우와 귀엽네요',
        },
        {
          User: {
            nickname: 'hero',
          },
          content: '저도 키워보고 싶네요~!',
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = 'ADD_POST';
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: '더미데이터입니다.',
  me: {
    id: 1,
    nickname: 'kimpm',
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
