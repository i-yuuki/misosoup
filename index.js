const COURSES = {
  // 4年制
  1: {name: "ゲーム制作コース", years: 4},
  2: {name: "ゲーム企画コース", years: 4},
  3: {name: "ゲームデザインコース", years: 4},
  4: {name: "CG・デザイン・アニメ4年制学科 CG映像コース", years: 4},
  5: {name: "アニメーター専攻", years: 4},
  6: {name: "イラストレーター専攻", years: 4},
  7: {name: "グラフィックデザイン学科 CGデザイナー専攻", years: 4},
  8: {name: "カーデザイン学科", years: 4},
  9: {name: "先端ロボット開発学科", years: 4},
  10: {name: "WEB開発コース", years: 4},
  11: {name: "高度情報処理コース", years: 4},
  12: {name: "ミュージック学科", years: 4},
  // 2年制
  13: {name: "ゲーム学科", years: 2},
  14: {name: "ミュージック学科", years: 2},
  15: {name: "CGデザイン専攻", years: 2},
  16: {name: "CGアニメーション専攻", years: 2},
  17: {name: "WEB学科", years: 2},
  18: {name: "情報処理学", years: 2},
};

const app = new Vue({
  el: "#app",
  data(){
    return {
      awards: {},
      works: [],
      worksSorted: [],
      school: "hal_tokyo",
      showFilter: false,
      filter: Object.fromEntries(Object.keys(COURSES).map(id => [id, true])),
      onlyShowAwarded: false,
    };
  },
  mounted(){
    this.fetchWorks();
    this.fetchAwards();
  },
  methods: {
    fetchWorks(){
      fetch(`./data/${this.school}.json`).then(res => res.json()).then(res => {
        const works = res.data;
        for(const work of works){
          work.url = `https://miraisozoten.com/${this.school}/works/${work.id}/`;
          if(work.thumbnail){
            work.thumbnail.url = work.thumbnail.url.replace(/dev\.miraisozoten\.com/, "miraisozoten.com").replace(/\/item\//, "/assets/images/hal/thumbnails/").replace(/\.(jpe?g|png|bmp)$/, "_640x360.jpg");
          }else{
            work.thumbnail = {};
          }
          work.courseInfos = work.courses.map(id => COURSES[id]);
        }
        this.works.splice(0, this.works.length, ...works);
        this.worksSorted.splice(0, this.worksSorted.length, ...works);
      });
    },
    fetchAwards(){
      fetch(`./data/awards.json`).then(res => res.json()).then(res => {
        this.awards = res;
      });
    },
    shuffle(v){
      if(v){
        // 雑シャッフル
        this.worksSorted.sort((a, b) => Math.random() >= 0.5 ? 1 : -1);
      }else{
        this.worksSorted.splice(0, this.worksSorted.length, ...this.works);
      }
    },
    setFilter(pred){
      for(const id of Object.keys(this.filter)){
        this.filter[id] = pred(COURSES[id]);
      }
    },
    getAward(work){
      const award = this.awards[this.school]?.find(award => award.work_id === work.id);
      // 配列を返すことでv-forで賞を変数みたいに扱えるっていうごりおし
      if(!award) return [];
      switch(award.type){
        case "large": return [{name: award.title, type: award.type}];
        case "detail": return [{name: award.giver, type: award.type}];
        default: return [];
      }
    }
  },
  computed: {
    worksDisplay(){
      let works = this.worksSorted.filter(work => work.courses.some(id => this.filter[id]));
      if(this.onlyShowAwarded){
        works = works.filter(work => this.getAward(work).length > 0);
      }
      return works;
    }
  },
  watch: {
    school(_){
      this.fetchWorks();
    }
  },
});
// e.is_sp || window.devicePixelRatio < 1.5 ? n.push(t.thumbnail.url.replace(/^https?:\/\/(dev\.)?miraisozoten\.com/, "").replace(/\/item\//, "/assets/images/hal/thumbnails/").replace(/\.(jpe?g|png|bmp)$/, "_640x360.jpg")) : n.push(t.thumbnail.url.replace(/^https?:\/\/(dev\.)?miraisozoten\.com/, "").replace(/\/item\//, "/assets/images/hal/thumbnails/").replace(/\.(jpe?g|png|bmp)$/, "_1280x720.jpg")) : location.search.match(/debug=1/) && m.a.DEBUG ? e.is_sp || window.devicePixelRatio < 1.5 ? r.push(t.thumbnail.url.replace(/\/debug\//, "/debug_resize/").replace(/\.jpg$/, "_640x360.jpg")) : r.push(t.thumbnail.url.replace(/\/debug\//, "/debug_resize/").replace(/\.jpg$/, "_960x540.jpg")) : e.is_sp || window.devicePixelRatio < 1.5 ? r.push(t.thumbnail.url.replace(/^https?:\/\/(dev\.)?miraisozoten\.com/, "").replace(/\/item\//, "/assets/images/hal/thumbnails/").replace(/\.(jpe?g|png|bmp)$/, "_640x360.jpg")) : r.push(t.thumbnail.url.replace(/^https?:\/\/(dev\.)?miraisozoten\.com/, "").replace(/\/item\//, "/assets/images/hal/thumbnails/").replace(/\.(jpe?g|png|bmp)$/, "_1280x720.jpg"))
