<template>
  <div class="m_map">
    <baidu-map
      @moveend="moveendMap"
      @ready="readyMap"
      class="bm-view"
      :center="center"
      ak="AAaf5f551c698000158e2252e357525a"
      :zoom="zoom"
    >
      <!-- 标记点 -->
      <bm-marker
        :position=" { lng: 116.4996510000, lat:39.9210681400 }"
        :dragging="true"
        animation="BMAP_ANIMATION_BOUNCE"
      ></bm-marker>
    </baidu-map>
  </div>
</template>

<script>
// import "@/styles/aboutus.css";
// BFQNxeYftMplAaTGkNdg6sugsGKuNdYo&services=&t=20180427193045
// 公司官网的数据
// src="http://api.map.baidu.com/getscript?v=2.0&ak=BFQNxeYftMplAaTGkNdg6sugsGKuNdYo&services=&t=20180427193045">
// lng 左右移动  （右移+）
// lat 上下移动
import {
  BaiduMap,
  BmLabel,
  BmGeolocation,
  BmOverlay,
  BmInfoWindow,
  BmMarker
} from "vue-baidu-map";
export default {
  data: () => ({
    center: { lng: 116.492851, lat: 39.92406814 },

    zoom: 17,
    point: (116.492851, 39.92406814),
    winHeight: 400,
    param: {
      lonMin: 0,
      lonMax: 0,
      latMin: 0,
      latMax: 0
    },
    infoWindow: {
      show: true,
      contents: ""
    },
    decShopPointerList: [],
    windowLabelPoint: {
      lng: 0,
      lat: 0
    },
    eventListen: false, // 地图初始完成之后才可监听移动、放大等事件
    map: {},
    shopBaseinfo: {},
    curIndex: -1,
    labelShow: true,
    labelStyles: {
      color: "#fff",
      fontSize: "12px",
      background: "#f56666",
      padding: "6px",
      border: "none",
      borderRadius: "4px"
    },
    labelCurStyles: {
      color: "#fff",
      fontSize: "12px",
      background: "#1894ea",
      padding: "6px",
      border: "none",
      borderRadius: "4px"
    }
  }),

  mounted() {
    if (window.innerHeight) {
      this.winHeight = window.innerHeight;
    } else if (document.body && document.body.clientHeight) {
      this.winHeight = document.body.clientHeight;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lng: position.coords.longitude,
          lat: position.coords.latitude
        };
      });
    }
    this.zoom = 17;
  },
  methods: {
    moveendMap() {
      if (this.eventListen) {
      }
    },
    infoWindowClose(e) {
      this.curIndex = -1;
      this.infoWindow.show = false;
    },
    infoWindowOpen(e) {
      this.infoWindow.show = true;
    },
    readyMap({ BMap, map }) {
      this.BMap = BMap;
      this.map = map;
      this.Geo = new BMap.Geocoder();
      this.eventListen = true;
    }
  },
  components: {
    BaiduMap,
    BmLabel,
    BmInfoWindow,
    BmMarker
  }
};
</script>

<style>
.bm-view {
  height: 398px;
  width: 800px;
}
.m_map {
  height: 398px;
  width: 800px;
}
</style>
