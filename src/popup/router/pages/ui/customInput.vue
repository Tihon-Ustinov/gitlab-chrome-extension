<template>
    <div class="group">
        <input type="text" required v-model="text">
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>{{ placeholder }}</label>
    </div>
</template>

<script>
  export default {
    name: "custom-input",
    model: {
      event: 'change'
    },
    props: {
      placeholder: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        text: ''
      };
    },
    watch: {
      text: function (newVal) {
        this.$emit('change', newVal)
      }
    }
  }
</script>

<style lang="css" scoped>
    * { box-sizing:border-box; }
    .group 			  {
        position:relative;
        margin-top: 20px;
    }
    input {
        border-radius: 5px;
        font-size: 14px;
        padding: 5px;
        display:block;
        width:100%;
        border:none;
        border-bottom:1px solid #757575;
    }
    input::-webkit-input-placeholder {
        padding: 5px;
    }
    input:focus 		{ outline:none; }

    label 				 {
        color:#999;
        width: 100%;
        text-align: left;
        font-size: 14px;
        font-weight:normal;
        position:absolute;
        pointer-events:none;
        left: 5px;
        top: 5px;
        transition:0.2s ease all;
        -moz-transition:0.2s ease all;
        -webkit-transition:0.2s ease all;
    }

    input:focus ~ label, input:valid ~ label 		{
        top:-20px;
        font-size:14px;
        color:#21E76E;
    }

    .bar 	{ position:relative; display:block; width: 100%; }
    .bar:before, .bar:after 	{
        content:'';
        height:2px;
        width:0;
        bottom:1px;
        position:absolute;
        background:#21E76E;
        transition:0.2s ease all;
        -moz-transition:0.2s ease all;
        -webkit-transition:0.2s ease all;
    }
    .bar:before {
        left:50%;
    }
    .bar:after {
        right:50%;
    }

    input:focus ~ .bar:before, input:focus ~ .bar:after {
        width:50%;
    }

    .highlight {
        position:absolute;
        height:60%;
        width:100px;
        top:25%;
        left:0;
        pointer-events:none;
        opacity:0.5;
    }

    input:focus ~ .highlight {
        -webkit-animation:inputHighlighter 0.3s ease;
        -moz-animation:inputHighlighter 0.3s ease;
        animation:inputHighlighter 0.3s ease;
    }

    @-webkit-keyframes inputHighlighter {
        from { background:#21E76E; }
        to 	{ width:0; background:transparent; }
    }
    @-moz-keyframes inputHighlighter {
        from { background:#21E76E; }
        to 	{ width:0; background:transparent; }
    }
    @keyframes inputHighlighter {
        from { background:#21E76E; }
        to 	{ width:0; background:transparent; }
    }
</style>
