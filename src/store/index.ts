import Vue from "vue";
import Vuex from "vuex";
import { Article } from "../types/article";
import { Comment } from "../types/comment";

Vue.use(Vuex);
/**
 * stateに掲示板サイトの投稿情報とコメント情報を持たせたindexファイル.
 */
export default new Vuex.Store({
  strict: true,
  state: {
    articles: [
      new Article(3, "佐藤", "佐藤さんの記事", []),
      new Article(2, "⼭⽥", "⼭⽥さんの記事", [
        new Comment(13, "⼭崎", "⼭崎さんのコメント", 2),
      ]),
      new Article(1, "伊藤", "伊藤さんの記事", [
        new Comment(12, "鈴⽊", "鈴⽊さんのコメント", 1),
        new Comment(11, "吉⽥", "吉⽥さんのコメント", 1),
      ]),
    ],
  },
  getters: {
    /**
     * 記事一覧を返す.
     * @remarks state内のarticlesを返す
     * @param state - ステートオブジェクト
     */
    getArticles(state): Array<Article> {
      return state.articles;
    },
    // ゲッター終わり
  },
  mutations: {
    /**
     * 記事を追加する.
     * @remarks
     * 受け取ったpayload内のarticleをstateのarticlesの0番⽬に追加する.
     * @param state - ステートオブジェクト
     * @param payload - 投稿した記事情報
     */
    addArticle(state, payload) {
      state.articles.unshift(payload);
    },

    /**
     * コメントを追加する.
     * @remarks
     * 1)渡されたpayload中のartcleIdから追加対象の記事を検索する.
     * 2)渡されたpayloadからコメントオブジェクトを⽣成する
     *  →記事が存在：CommentListにコメントを追加する
     * @param state - ステートオブジェクト
     * @param payload - 新しいコメントの情報
     */
    addComment(state, payload) {
      // for (const article of state.articles) {
      //   if (payload.articleId == article.id) {
      //     article.commentList.unshift(payload);
      //   }
      // }
      const abc = state.articles.find(
        (article) => article.id == payload.articleId
      );
      abc?.commentList.unshift(payload);
    },

    /**
     * 記事を削除する.
     * @remarks
     * 渡されたpayload中のarticleIndex番⽬から1件だけstate内のactionsから削除する.
     * @param state - ステートオブジェクト
     * @param payload - 現在の投稿の対象ID
     */
    deleteArticle(state, payload) {
      state.articles.splice(payload, 1);
    },
    //ミュー終わり
  },
  actions: {},
  modules: {},
});
