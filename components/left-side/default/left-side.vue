<template>
  <!-- Left side column. contains the logo and sidebar -->
  <aside class="left-aside sidebar-offcanvas">
    <!-- sidebar: style can be found in sidebar -->
    <section class="sidebar">
      <div id="menu" role="navigation">
        <vmenu>
          <vmenu-item link="/dashboard" icon="ti-desktop">
            &nbsp; Overview
          </vmenu-item>
          <vsub-menu title="Reporting & BI" icon="ti-stats-up">
            <!-- <vmenu-item link="/ReportingAndBI/ReportingDashboard">
              Reporting Dashboard
            </vmenu-item> -->
            <vmenu-item link="/ReportingAndBI/GamingActivity">
              Gaming Activity
            </vmenu-item>
            <vmenu-item link="/ReportingAndBI/NetworkSales">
              Network Sales
            </vmenu-item>
            <vmenu-item link="/ReportingAndBI/Commission">
              Commission
            </vmenu-item>
            <!-- <vmenu-item link="/ReportingAndBI/OnlineSales">
              Online Sales
            </vmenu-item>
            <vmenu-item link="/ReportingAndBI/RegistrationsHistory">
              Registrations History
            </vmenu-item> -->

            <vmenu-item link="/ReportingAndBI/AccountingReport">
              Accounting Report
            </vmenu-item>
            <!-- <vmenu-item link="/ReportingAndBI/NetCashReport">
              Net Cash Report
            </vmenu-item>
            <vmenu-item link="/ReportingAndBI/MoneyTransactions">
              Money Transactions
            </vmenu-item>
            <vmenu-item link="/ReportingAndBI/SystemTransactions">
              System Transactions
            </vmenu-item> -->
            <!-- <vmenu-item link="/ReportingAndBI/TaxOnReturnReport">
                            Tax on Return Report
                        </vmenu-item>
                        <vmenu-item link="/ReportingAndBI/TaxOnTurnoverReport">
                            Tax on Turnover Report
                        </vmenu-item> -->
          </vsub-menu>
          <vsub-menu title="Network" icon="fa fa-sitemap fa-2x">
            <vmenu-item link="/Network/AgencyList"> Agency List </vmenu-item>
            <vmenu-item link="/Network/NewAgent"> Add New Agent </vmenu-item>
          </vsub-menu>
          <vsub-menu title="Ticket Management" icon="ti-basketball">
            <!-- <vmenu-item link="/Sport/BetSearch"> Quick bet Search </vmenu-item> -->
            <!-- <vmenu-item link="/Sport/TicketsOnHold">
              Tickets On Hold
            </vmenu-item> -->
            <vmenu-item link="/Sport/OpenBets"> Open Bets </vmenu-item>
            <vmenu-item link="/Sport/BetsHistory"> Bets History </vmenu-item>
          </vsub-menu>
          <vsub-menu title="Jackpots" icon="ti-medall">
            <vmenu-item link="/ContentManagement/Jackpots/TicketJackpots">
              Ticket Jackpots
            </vmenu-item>
            <vmenu-item link="/ContentManagement/Jackpots/AddNew">
              Create new Jackpot
            </vmenu-item>
          </vsub-menu>
          <vsub-menu title="Risk Management" icon="ti-list">
            <vmenu-item link="/RiskManagement/BettingParameters">
              Betting Parameters
            </vmenu-item>
          </vsub-menu>
          <vsub-menu title="Communications" icon="ti-comment-alt">
            <vmenu-item link="/Communications/NetworkMessages">
              Network Messages
            </vmenu-item>
          </vsub-menu>
          <vsub-menu title="User Management" icon="ti-user">
            <vmenu-item link="/UserManagement/Users"> Users </vmenu-item>
            <vmenu-item
              link="/UserManagement/RolesPermissions"
            >
              Roles & Permissions
            </vmenu-item>
          </vsub-menu>
          <vsub-menu title="Currency Settings" icon="ti-user">
            <vmenu-item link="/Settings/CurrencySettings"> Currencies </vmenu-item>
          </vsub-menu>
          <vmenu-item link="/OnlineHelp" icon="ti-info">
            &nbsp;Online Help
          </vmenu-item>
        </vmenu>
        <!-- / .navigation -->
      </div>
      <!-- menu -->
    </section>
    <!-- /.sidebar -->
  </aside>
</template>
<script>
import vmenu from "./menu/vueMenu";
import vsubMenu from "./menu/subMenu";
import vmenuItem from "./menu/MenuItem";
export default {
  name: "left-side",
  components: {
    vmenu,
    vsubMenu,
    vmenuItem,
  },
};
</script>
<style>
.leftmenu_icon {
  font-size: 12px !important;
}
</style>
