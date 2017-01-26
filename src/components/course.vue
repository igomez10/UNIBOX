<template>
  <div>
    <v-list-item class="list-group-item">
      <div style="text-align:left;">
        <router-link :courseCode="courseCode" :courseName="courseName" :to="courseUrl" style="text-align:left;" >
        🎓 {{courseCode}} - {{courseName}}
        </router-link>
      </div>
    </v-list-itemt>
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
    select:function(){
      this.isSelected = true;
    }
  },
  computed: {
    career: function(){
      const a = this.courseCode.substring(0,4).toLowerCase();
      return a;
    },
    courseUrl: function(){
      return "/" + this.career + "/" + this.courseCode;
    }
  }
}
</script>
