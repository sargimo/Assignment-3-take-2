<template>
<div>
  <Mynav />
 
  <JeremyDesignerHomepage />
  <CallToAction />
  <Myfooter />
</div>
</template>

<script>
import Mynav from "./mynav/Mynav.vue"
import Myfooter from "./myfooter/Myfooter.vue"
import JeremyDesignerHomepage from "./jeremyDesignerHomepage/JeremyDesignerHomepage.vue"
import CallToAction from "./calltoaction/CallToAction.vue"

export default {
  name: "Jeremy",
  components: {
    Mynav,
    Myfooter,
    JeremyDesignerHomepage,
    CallToAction
  }
};
</script>

<style scoped>


</style>