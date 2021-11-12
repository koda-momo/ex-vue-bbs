<template>
  <div id="app">
    <!-- 始め -->
    掲⽰板画⾯
    <!-- 記事投稿画面は1つ -->
    <div>
      投稿者名：
      <div><input type="text" v-model="articleName" /></div>
      投稿内容：
      <div>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          v-model="articleContent"
        ></textarea>
      </div>
      <div>
        <button type="button" v-on:click="addArticle()">記事投稿</button>
      </div>
    </div>

    <hr />

    <!-- 投稿内容表示画面 -->
    <div v-for="article of currentArticleList" :key="article.id">
      投稿者名：{{ article.name }}
      <br />
      投稿内容：
      <pre>{{ article.content }}</pre>
      <br />
      <button type="button">記事削除</button>

      <!-- コメント表示 -->
      <div v-for="comment of article.commentList" :key="comment.id">
        コメント者名：{{ comment.name }}
        <br />
        コメント内容：
        <pre>    {{ comment.content }}</pre>
      </div>
      <!-- コメント投稿画面は記事ごとに1つ -->
      <div>
        名前：
        <div><input type="text" /></div>
        コメント：
        <div><textarea name="" id="" cols="30" rows="10"></textarea></div>
        <div><button type="button">コメント投稿</button></div>
      </div>
      <hr />
    </div>

    <!-- 終わり -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Article } from "../types/article";
import { Comment } from "../types/comment";
@Component
/**
 * 掲示板投稿サイトのvueファイル.
 */
export default class Bbs extends Vue {
  // 始め
  //現在の記事一覧
  private currentArticleList = new Array<Article>();
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
    this.currentArticleList = this["$store"].getters.getArticles;
    console.dir("response:" + JSON.stringify(this.currentArticleList));
    console.log(this.currentArticleList[0].name);
  }

  /**
   * 記事を追加する.
   * @remarks
   * 1)最新の記事IDに１プラスする形で記事IDを作成する
   * 2)ミューテーションのaddArticleメソッドを呼ぶ
   *   →引数：payload=article: new Articles(新しく発⾏したID,⼊⼒した投稿者名,⼊⼒した投稿内容,[])
   * 3)⼊⼒値をフォームからクリアする
   */
  //1)
  addArticle(): void {
    const newId = this.currentArticleList[0].id + 1;
    //2)
    this["$store"].commit("addArticle", {
      article: new Article(newId, this.articleName, this.articleContent, []),
    });
    //3)
    this.articleName = "";
    this.articleContent = "";
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
