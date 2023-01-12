const app = new Vue({
  el: "#app",
  data(){
    return {
      years: [],
      currentYearIdx: 0,
      awards: {},
      works: [],
      worksSorted: [],
      school: "hal_tokyo",
      showFilter: false,
      filter: {},
      onlyShowAwarded: false,
    };
  },
  mounted(){
    this.fetchYears();
  },
  methods: {
    fetchYears(){
      this.years.length = 0;
      fetch(`../data/years.json`).then(res => res.json()).then(res => {
        this.years.splice(0, this.years.length, ...res);
        this.selectYear(0);
      });
    },
    fetchWorks(){
      this.works.splice(0);
      this.worksSorted.splice(0);
      fetch(`../data/${this.currentYear.year}/${this.school}.json`).then(res => res.json()).then(res => {
        const works = res.data;
        for(const work of works){
          work.courseInfos = work.courses.map(id => this.currentYear.courses[id]);
        }
        this.works.splice(0, this.works.length, ...works);
        this.worksSorted.splice(0, this.worksSorted.length, ...works);
      });
    },
    fetchAwards(){
      this.awards = {};
      if(this.currentYear.has_awards){
        fetch(`../data/${this.currentYear.year}/awards.json`).then(res => res.json()).then(res => {
          this.awards = res;
        });
      }
    },
    selectYear(idx){
      this.currentYearIdx = idx;
      this.works.length = 0;
      this.awards = {};
      this.filter = Object.fromEntries(Object.keys(this.currentYear.courses).map(id => [id, true])),
      this.school = this.currentYear.schools[0].id;
      this.fetchWorks();
      this.fetchAwards();
    },
    shuffle(v){
      if(v){
        this.worksSorted.sort((a, b) => Math.random() >= 0.5 ? 1 : -1);
      }else{
        this.worksSorted.splice(0, this.worksSorted.length, ...this.works);
      }
    },
    setFilter(pred){
      for(const id of Object.keys(this.filter)){
        this.filter[id] = pred(this.currentYear.courses[id]);
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
    currentYear(){
      return this.years[this.currentYearIdx];
    },
    worksDisplay(){
      let works = this.worksSorted.filter(work => work.courses.some(id => this.filter[id]));
      if(this.currentYear?.has_awards && this.onlyShowAwarded){
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
