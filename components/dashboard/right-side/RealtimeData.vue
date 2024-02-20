<template>
    <table class="table table-striped table-bordered">
        <tbody>
            <tr>
                <td>Today's Bets</td>
                <td class="text-right">{{ formatNumber(data.todayBets, false) }}</td>
            </tr>
            <tr>
                <td>Total Bets</td>
                <td class="text-right">{{ formatNumber(data.totalBets, false) }}</td>
            </tr>
        </tbody>
    </table>
</template>
<script>
export default {
    props: [
        'data'
    ]
}
</script>
