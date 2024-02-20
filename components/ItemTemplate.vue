<template>
  <div>
    <b>{{item.event_id}}</b>
    <span>{{ item.team_1+' - '+item.team_2 }}</span>
    <abbr>{{item.event_date+' '+item.event_time}}</abbr>
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true },
    searchText: { required: true }
  }
}
</script>