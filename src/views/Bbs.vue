<template>
  <div id="app">
    <!-- 始め -->
    掲⽰板画⾯
    <!-- 記事投稿画面は1つ -->
    <div>
      投稿者名： <span class="error">{{ errorName }}</span>
      <div><input type="text" v-model="articleName" /></div>
      投稿内容： <span class="error">{{ errorContent }}</span>
      <div>
        <textarea cols="30" rows="10" v-model="articleContent"></textarea>
      </div>
      <div>
        <button type="button" v-on:click="addArticle()">記事投稿</button>
      </div>
    </div>

    <hr />

    <!-- 投稿内容表示画面 -->
    <div v-for="(article, i) of currentArticleList" :key="article.id">
      投稿者名：{{ article.name }}
      <br />
      投稿内容：
      <pre>{{ article.content }}</pre>
      <br />
      <button type="button" v-on:click="deleteArticle(i)">記事削除</button>
      <!-- コメント表示 -->
      <div
        v-for="comment of article.commentList"
        :key="comment.id"
        class="comment"
      >
        コメント者名：{{ comment.name }}
        <br />
        コメント内容：
        <pre>{{ comment.content }}</pre>
      </div>
      <Comme :article-id="article.id"> </Comme>
    </div>

    <!-- 終わり -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Article } from "../types/article";
import Comme from "../components/comment.vue";
@Component({ components: { Comme } })
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
  //投稿名前についてのエラーメッセージ
  private errorName = "";
  //投稿内容についてのエラーメッセージ
  private errorContent = "";

  /**
   * 記事⼀覧を表⽰する.
   * @remarks
   * Vuexストア内の記事⼀覧(articles)をcurrentArticleListに格納
   */
  created(): void {
    this.currentArticleList = this["$store"].getters.getArticles;
    console.dir("response:" + JSON.stringify(this.currentArticleList));
  }

  /**
   * 記事を追加する.
   * @remarks
   * 1)入力に誤りがあった場合はerrorを表示する
   * 2)最新の記事IDに１プラスする形で記事IDを作成する
   * 3)ミューテーションのaddArticleメソッドを呼ぶ
   *   →引数：payload=article: new Articles(新しく発⾏したID,⼊⼒した投稿者名,⼊⼒した投稿内容,[])
   * 4)⼊⼒値をフォームからクリアする
   */
  addArticle(): void {
    //1)
    this.errorName = "";
    this.errorContent = "";
    if (this.articleName.length > 50) {
      this.errorName = "名前は50字以内で入力して下さい";
      return;
    }
    if (this.articleName === "" && this.articleContent === "") {
      this.errorName = "名前を入力して下さい";
      this.errorContent = "内容を入力してください";
      return;
    }
    if (this.articleName === "") {
      this.errorName = "名前を入力して下さい";
      return;
    }
    if (this.articleContent === "") {
      this.errorContent = "内容を入力してください";
      return;
    }
    //2)
    const newId = this.currentArticleList[0].id + 1;
    //3)
    this["$store"].commit(
      "addArticle",
      new Article(newId, this.articleName, this.articleContent, [])
    );
    //4)
    this.articleName = "";
    this.articleContent = "";
  }

  /**
   * 記事を削除する.
   *@remarks
   *ミューテーションのdeleteArticleメソッドを呼ぶ
   * →引数：payload=引数で受け取ったarticleIndex
   * @param articleIndex - 現在の投稿の対象ID
   */
  deleteArticle(articleIndex: number): void {
    this["$store"].commit("deleteArticle", articleIndex);
  }
  // 終わり
}
</script>

<style scoped>
.comment {
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 20px;
  width: 500px;
  background-color: white;
  border: solid 2px rgb(13, 21, 128);
}

button {
  margin: 5px;
}

#app {
  background-color: rgb(227, 240, 255);
}

.error {
  color: red;
}
</style>
