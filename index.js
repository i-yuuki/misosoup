const COURSES = {
  1: {name: "ゲーム4年制学科ゲーム制作コース", years: 4},
  2: {name: "ゲーム企画学科", years: 4},
  3: {name: "ゲームデザイン学科", years: 4},
  4: {name: "CG映像学科", years: 4},
  5: {name: "アニメ・イラスト学科", years: 4},
  6: {name: "グラフィックデザイン学科", years: 4},
  7: {name: "カーデザイン学科", years: 4},
  8: {name: "先端ロボット開発学科", years: 4},
  9: {name: "WEB開発学科", years: 4},
  10: {name: "高度情報学科", years: 4},
  11: {name: "ミュージック学科", years: 4},
  12: {name: "ゲーム学科", years: 2},
  13: {name: "ミュージック学科", years: 2},
  14: {name: "CG学科", years: 2},
  15: {name: "WEB学科", years: 2},
  16: {name: "情報処理学科", years: 2},
};

const app = new Vue({
  el: "#app",
  data(){
    // for(const work of d.miso.data){
    //   work.url = `https://miraisozoten.com/hal_tokyo/works/${work.id}/`;
    //   work.thumbnail.url = work.thumbnail.url.replace(/dev\.miraisozoten\.com/, "miraisozoten.com").replace(/\/item\//, "/assets/images/hal/thumbnails/").replace(/\.(jpe?g|png|bmp)$/, "_640x360.jpg");
    //   work.courseInfos = work.courses.map(id => COURSES[id]);
    // }
    // return d;
    return {
      works: [],
      worksSorted: [],
      school: "hal_tokyo",
    };
  },
  mounted(){
    this.fetchWorks();
  },
  methods: {
    fetchWorks(){
      fetch(`./data/${this.school}.json`).then(res => res.json()).then(res => {
        const works = res.data;
        for(const work of works){
          work.url = `https://miraisozoten.com/${this.school}/works/${work.id}/`;
          work.thumbnail.url = work.thumbnail.url.replace(/dev\.miraisozoten\.com/, "miraisozoten.com").replace(/\/item\//, "/assets/images/hal/thumbnails/").replace(/\.(jpe?g|png|bmp)$/, "_640x360.jpg");
          work.courseInfos = work.courses.map(id => COURSES[id]);
        }
        this.works.splice(0, this.works.length, ...works);
        this.worksSorted.splice(0, this.works.length, ...works);
      });
    },
    shuffle(v){
      if(v){
        // 雑シャッフル
        this.worksSorted.sort((a, b) => Math.random() >= 0.5 ? 1 : -1);
      }else{
        this.worksSorted.splice(0, this.worksSorted.length, ...this.works);
      }
    }
  },
  watch: {
    school(_){
      this.fetchWorks();
    }
  },
});
// e.is_sp || window.devicePixelRatio < 1.5 ? n.push(t.thumbnail.url.replace(/^https?:\/\/(dev\.)?miraisozoten\.com/, "").replace(/\/item\//, "/assets/images/hal/thumbnails/").replace(/\.(jpe?g|png|bmp)$/, "_640x360.jpg")) : n.push(t.thumbnail.url.replace(/^https?:\/\/(dev\.)?miraisozoten\.com/, "").replace(/\/item\//, "/assets/images/hal/thumbnails/").replace(/\.(jpe?g|png|bmp)$/, "_1280x720.jpg")) : location.search.match(/debug=1/) && m.a.DEBUG ? e.is_sp || window.devicePixelRatio < 1.5 ? r.push(t.thumbnail.url.replace(/\/debug\//, "/debug_resize/").replace(/\.jpg$/, "_640x360.jpg")) : r.push(t.thumbnail.url.replace(/\/debug\//, "/debug_resize/").replace(/\.jpg$/, "_960x540.jpg")) : e.is_sp || window.devicePixelRatio < 1.5 ? r.push(t.thumbnail.url.replace(/^https?:\/\/(dev\.)?miraisozoten\.com/, "").replace(/\/item\//, "/assets/images/hal/thumbnails/").replace(/\.(jpe?g|png|bmp)$/, "_640x360.jpg")) : r.push(t.thumbnail.url.replace(/^https?:\/\/(dev\.)?miraisozoten\.com/, "").replace(/\/item\//, "/assets/images/hal/thumbnails/").replace(/\.(jpe?g|png|bmp)$/, "_1280x720.jpg"))
