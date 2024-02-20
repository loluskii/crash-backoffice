<template>
    <div>
        <div class="row">
            <div class="col-md-6">
                <card title="Financial Overview">
                    <div id="basicFlotLegend1" class="flotLegend"></div>
                    <div id="basicflot" class="flotChart"></div>
                </card>
            </div>
            <div class="col-md-6">
                <card title="Bonus Spent & NGR Overview">
                    <div id="basicFlotLegend" class="flotLegend"></div>
                    <div id="line-chart" class="flotChart1"></div>
                </card>
            </div>
        </div>
        <!-- row -->
        <div class="row">
            <div class="col-lg-6">
                <!-- Stack charts strats here-->
                <card title="Virtual Actvity GGR" class="body-bg">
                        <div id="basicFlotLegend-barchart" class="flotLegend"></div>
                        <div id="bar-chart" class="flotChart1"></div>
                </card>
            </div>
            <div class="col-lg-6">
                <!-- Stack charts strats here-->
                <card title="Active Players">
                    <div id="basicFlotLegend-stac" class="flotLegend"></div>
                    <div id="bar-chart-stacked" class="flotChart1"></div>
                </card>
            </div>
        </div>
        <!-- row -->
        <!-- row -->
        <div class="row">
            <div class="col-lg-6">
                <!-- Stack charts strats here-->
                <card title="GGR & NGR by Client Type" class="body-bg">
                    <div id="basicFlotLegend-barchart" class="flotLegend"></div>
                    <div id="bar-chart" class="flotChart1"></div>
                </card>
            </div>
            <div class="col-lg-6">
                <!-- Stack charts strats here-->
                <card title="FTDS vs Conversions">
                    <div id="basicFlotLegend-stac" class="flotLegend"></div>
                    <div id="bar-chart-stacked" class="flotChart1"></div>
                </card>
            </div>
        </div>
    </div>
</template>
<script>
import card from "../../components/card.vue"
export default {
    name: "flot_charts",
    layout: 'main',
    components:{
        card
    },
}
</script>