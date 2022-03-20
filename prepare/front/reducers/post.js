import shortId from 'shortid';
import produce from 'immer';

export const initialState = {
  mainPosts: [
    {
      id: 1,
      me: {
        id: 1,
        nickname: 'kimpm',
      },
      content: '첫 번째 게시글 #고양이 #사막여우 #수달',
      Images: [{
          id: shortId.generate(),
          src: 'https://url.kr/v4zq1y',
        },{
          id: shortId.generate(),
          src: 'https://url.kr/3972kr',
        },{
          id: shortId.generate(),
          src: 'https://url.kr/urvxlc',
        }],
      Comments: [{
        id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: 'nero',
          },
          content: '우와 귀엽네요',
        },{
          User: {
            id: shortId.generate(),
            nickname: 'hero',
          },
          content: '저도 키워보고 싶네요~!',
        }],
    }],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({ // 동적 액션 크리에이터
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  me: {
    id: 1,
    nickname: 'kimpm',
  },
  Images: [],
  Comments: [],
},[]);

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  me: {
    id: 1,
    nickname: 'kimpm',
  },
},[]);
// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지키면서)
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = false;
        draft.mainPosts.unshift(dummyPost(action,data));
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = true;
        draft.PostError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;    
        break;

      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;

      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      //immer 쓴 이유 
      case ADD_COMMENT_SUCCESS:{
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data.content));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
        //   const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
        //   const post ={ ...state.mainPosts[postIndex] };
        //   post.Comments = [dummyComment(action.data.content), ...post.Comments];
        //   const mainPosts = [...state.mainPosts];
        //   mainPosts[postIndex] = post;
        //   return {
        //     ...state,
        //     addCommentLoading: false,
        //     addCommentDone: true,
        //   };
      }
    case ADD_COMMENT_FAILURE:
      draft.addCommentLoading = false;
      draft.addCommentError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;
