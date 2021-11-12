import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    strict: true,
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
     * @param state
     */
    getArticles(state) {
      1 + 1;
    },
    // ゲッター終わり
  },
  mutations: {
    /**
     * 記事を追加する.
     * @remarks
     * 受け取ったpayload内のarticleをstateのarticlesの0番⽬に追加する
     * @param state
     * @param payload articleの配列
     */
    addArticle(state, payload) {
      1 + 1;
    },

    /**
     * コメントを追加する.
     * @remarks
     * 渡されたpayload中のartcleIdから追加対象の記事を検索する
     * 渡されたpayloadからコメントオブジェクトを⽣成する
     * 記事が存在→CommentListにコメントを追加する
     * @param state
     * @param payload articleの配列
     */
    addComment(state, payload) {
      1 + 1;
    },

    /**
     * 記事を削除する.
     * @remarks
     * ・渡されたpayload中のarticleIndex番⽬から1件だけstate内のactionsから削除する
     * @param state
     * @param payload articleの配列
     */
    deleteArticle(state, payload) {
      1 + 1;
    },
    //ミュー終わり
  },
  actions: {},
  modules: {},
});
