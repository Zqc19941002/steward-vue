<template>
    <div class="file-container">

    </div>
</template>

<script>
    export default {
        name: "RecentFile",
        data() {
            return {
                recentFile: [],
            }
        },
        methods: {

        },
        mounted: function () {
            this.recentFile = this.fileData
        },
        props: ["fileData"],
        components:{

        }
    }
</script>

<style scoped>
    .fileUpLoad{
        margin: 0 auto;
        width: 100%;
    }
    .file-container {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
    .file-item{
        width: 105px;
        height: 90px;
        padding: 0px 20px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    .file-item:hover{
        background-color: #F2F5F7;
    }
    .file-item-img{
        width: 80px;
        height: 70px;
    }
    .file-item .file-item-info{
        text-align: center;
    }
    .file-item .file-item-info label{
        display: block;
        width: 85px;
    }
</style>
