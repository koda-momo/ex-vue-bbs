import Vue from "vue";
import Vuex from "vuex";
import { Article } from "../types/article";
import { Comment } from "../types/comment";
import axios from "axios";

Vue.use(Vuex);
/**
 * stateに掲示板サイトの投稿情報とコメント情報を持たせたindexファイル.
 */
export default new Vuex.Store({
  strict: true,
  state: {
    articles: new Array<Article>(),
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
     * 概要：記事⼀覧情報を作成して state に格納する.
     *
     * @remarks
     *元データを回して、自分で作成した配列atricleに上書き
     *
     * @param state- ステートオブジェクト
     * @param payload- (astionから受け取っている、元データを格納している引数)(JSON形式の記事情報)
     */
    showArticleList(state, payload) {
      state.articles = payload.articles;
      console.log("articles:" + state.articles);
    },

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
      const findArticle = state.articles.find(
        (article) => article.id == payload.articleId
      );
      console.log(findArticle);
      if (findArticle) {
        findArticle.commentList.unshift(payload);
      }
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
  actions: {
    /**
     * 概要︓記事の情報を WebAPI から取得して mutation を呼び出す.
     * @remarks
     *1)axios を使⽤してWebAPI を呼ぶ。
     *2)取得した response データの中の data を取り出して payload 変数に格納する。
     *3)showEmployeeList という名前のミューテーションを呼び出す。
     *
     * @param context-ミューテーションを経由するために設定している引数
     */
    async getArticleList(context) {
      //1)
      const response = await axios.get(
        "http://54.203.85.248:8080/ex-bbs-api/bbs/articles"
      );
      const payload = response.data;
      console.dir("response:" + JSON.stringify(payload));
      context.commit("showArticleList", payload);
    },
  }, // end actions
  modules: {},
});
