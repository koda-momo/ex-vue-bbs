<template>
  <div id="app">
    掲⽰板画⾯
    <!-- 始め -->
    <!-- 終わり -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Article } from "../types/article";
import { Comment } from "../types/comment";
@Component
export default class Bbs extends Vue {
  // 始め
  //現在の記事一覧
  private currentArticleList = [];
  //投稿者名
  private articleName = "";
  //投稿内容
  private articleContent = "";
  //コメント者名
  private commentName = "";
  //コメント内容
  private commentContent = "";

  /**
   * 記事⼀覧を表⽰する.
   * @remarks
   * Vuexストア内の記事⼀覧(articles)をcurrentArticleListに格納
   */
  created(): void {
    1 + 1;
  }

  /**
   * 記事を追加する.
   * @remarks
   * 最新の記事IDに１プラスする形で記事IDを作成する
   * ミューテーションのaddArticleメソッドを呼ぶ
   * →引数：payload=article: new Articles(新しく発⾏したID,⼊⼒した投稿者名,⼊⼒した投稿内容,[])
   * ⼊⼒値をフォームからクリアする
   */
  addArticle(): void {
    1 + 1;
  }

  /**
   * コメントを追加する.
   * @remarks
   * ミューテーションのaddCommentメソッドを呼ぶ
   * →引数：payload=comment: new Comment(-1,⼊⼒したコメント者名,⼊⼒したコメント内容,引数で受け取ったarticleId)
   * ・⼊⼒値をフォームからクリアする
   */
  addComment(articleId: number): void {
    1 + 1;
  }

  /**
   * 記事を削除する.
   *@remarks
   *ミューテーションのdeleteArticleメソッドを呼ぶ
   *→引数：payload=引数で受け取ったarticleIndex
   */
  deleteArticle(articleIndex: number): void {
    1 + 1;
  }

  // 終わり
}
</script>

<style></style>
