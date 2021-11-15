<template>
  <div class="Com">
    <!-- 始め -->

    <!-- コメント投稿画面は記事ごとに1つ -->
    <div>
      名前：<span class="error" v-show="errorCommentName"
        >名前を入力して下さい</span
      ><span class="error" v-show="errorCommentName50"
        >名前は50文字以内で入力して下さい</span
      >
      <div><input type="text" v-model="commentName" /></div>
      コメント：<span class="error" v-show="errorComment"
        >内容を入力してください</span
      >
      <div>
        <textarea cols="30" rows="10" v-model="commentContent"></textarea>
      </div>
      <button type="button" v-on:click="addComment(articleId)">
        コメント投稿
      </button>
    </div>
    <hr />

    <!-- 終わり -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Comment } from "../types/comment";
import axios from "axios";
@Component
/**
 * コメント追加部分のコンポーネントです
 */
export default class Comme extends Vue {
  @Prop()
  //対象の投稿ID(値は親Bbsから受け取り)
  articleId!: number;
  //コメント者名
  private commentName = "";
  //コメント内容
  private commentContent = "";
  //コメント名前についてのエラーメッセージ
  private errorCommentName = false;
  //コメント名前についてのエラーメッセージ(51文字以上)
  private errorCommentName50 = false;
  //コメント名前についてのエラーメッセージ
  private errorComment = false;

  /**
   * コメントを追加する.
   * @remarks
   * 1)入力に誤りがあった場合はerrorを表示する
   * 2)ミューテーションのaddCommentメソッドを呼ぶ
   *   →引数：payload=comment: new Comment(id,⼊⼒したコメント者名,⼊⼒したコメント内容,引数で受け取ったarticleId)
   * 3)⼊⼒値をフォームからクリアする
   * @param articleId - 親コンポーネント(Bbs.vue)から受け取った対応する投稿のID
   */
  async addComment(articleId: number): Promise<void> {
    //1)
    this.errorCommentName50 = false;
    this.errorCommentName = false;
    this.errorComment = false;

    if (this.commentName.length > 50) {
      this.errorCommentName50 = true;
    }
    if (this.commentName === "") {
      this.errorCommentName = true;
    }
    if (this.commentContent === "") {
      this.errorComment = true;
    }
    if (this.errorCommentName50 || this.errorCommentName || this.errorComment) {
      return;
    }

    console.log(articleId);
    //2)
    await axios.post("http://54.203.85.248:8080/ex-bbs-api/bbs/comment", {
      name: this.commentName,
      content: this.commentContent,
      articleId: articleId,
    });
    //API不使用時
    // this["$store"].commit(
    //   "addComment",
    //   new Comment(-1, this.commentName, this.commentContent, articleId)
    // );
    //3)
    this.commentName = "";
    this.commentContent = "";

    this["$store"].dispatch("getArticleList");
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
