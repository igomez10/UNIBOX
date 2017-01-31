<template>
  <div style="margin: 2px;" align=center>
  <a class="list-group-item" v-on:click="scrollUp()">
    <router-link :courseCode="courseCode" :courseName="courseName" :to="courseUrl" >
      🎓 {{courseCode}} - {{courseName}}
    </router-link>
  </a>
  </div>
</template>


<script>

export default{
  name: 'course',
  data:function(){
    return {
      isSelected: false,
      files: []
    }
  },
  props:{
    courseCode: {default:''},
    courseName: {default:''}
  },
  methods:{
    select: function(){
      this.isSelected = true;
    },
    scrollUp: function(){
      window.scroll(0,0);
    }
  },
  computed: {
    career: function(){
      const a = this.courseCode.substring(0,4).toLowerCase();
      return a;
    },
    courseUrl: function(){
      window.scroll(0,0);
      return "/" + this.career + "/" + this.courseCode;

    }
  }
}
</script>
