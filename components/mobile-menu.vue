<template>
  <div>
    <b-sidebar id="sidebar-1" shadow>
      <section class="sidebar">
        <div id="menu" role="navigation">
          <vmenu>
            <vmenu-item link="/dashboard" icon="ti-desktop">
              &nbsp; Overview
            </vmenu-item>
            <vsub-menu
              v-permission="'Report and BI'"
              title="Reporting & BI"
              icon="ti-stats-up"
            >
              <!-- <vmenu-item link="/ReportingAndBI/ReportingDashboard">
              Reporting Dashboard
            </vmenu-item> -->
              <vmenu-item link="/ReportingAndBI/GamingActivity">
                Gaming Activity
              </vmenu-item>
              <vmenu-item link="/ReportingAndBI/NetworkSales">
                Network Sales
              </vmenu-item>
              <vmenu-item
                link="/ReportingAndBI/Commission"
                v-permission="'Commission'"
              >
                Commission
              </vmenu-item>
              <vmenu-item link="/ReportingAndBI/OnlineSales">
                Online Sales
              </vmenu-item>
              <vmenu-item link="/ReportingAndBI/RegistrationsHistory">
                Registrations History
              </vmenu-item>

              <vmenu-item link="/ReportingAndBI/AccountingReport">
                Accounting Report
              </vmenu-item>
              <vmenu-item link="/ReportingAndBI/NetCashReport">
                Net Cash Report
              </vmenu-item>
              <vmenu-item link="/ReportingAndBI/MoneyTransactions">
                Money Transactions
              </vmenu-item>
              <vmenu-item link="/ReportingAndBI/SystemTransactions">
                System Transactions
              </vmenu-item>
              <!-- <vmenu-item link="/ReportingAndBI/TaxOnReturnReport">
                            Tax on Return Report
                        </vmenu-item>
                        <vmenu-item link="/ReportingAndBI/TaxOnTurnoverReport">
                            Tax on Turnover Report
                        </vmenu-item> -->
            </vsub-menu>
            <vsub-menu
              v-permission="'Sport'"
              title="Sport"
              icon="ti-basketball"
            >
              <vmenu-item link="/Sport/BetSearch">
                Quick bet Search
              </vmenu-item>
              <vmenu-item
                v-permission="'Tickets on Hold'"
                link="/Sport/TicketsOnHold"
              >
                Tickets On Hold
              </vmenu-item>
              <vmenu-item link="/Sport/OpenBets"> Open Bets </vmenu-item>
              <vmenu-item link="/Sport/BetsHistory"> Bets History </vmenu-item>
              <vmenu-item link="/Sport/PendingCashout">
                Pending Cashout Bets
              </vmenu-item>
              <vmenu-item link="/Sport/WinningsOnHold">
                Winnings on Hold
              </vmenu-item>
              <vmenu-item
                v-permission="'Exposure monitor'"
                link="/Sport/ExposureMonitor"
              >
                Exposure Monitor
              </vmenu-item>
              <!--<vmenu-item link="/Sport/SportsPerformance">
                            Sports Performance
                        </vmenu-item>

                        <vmenu-item v-permission="'Prediction Setup'" link="/Sport/HotMatches">
                            Prediction Setup
                        </vmenu-item> -->
            </vsub-menu>
            <vmenu-item link="/VirtualSport" icon="ti-game">
              &nbsp; Virtual Sport
            </vmenu-item>
            <vsub-menu title="Lucky Balls" icon="ti-basketball">
              <!-- <vmenu-item link="">
                Tickets
            </vmenu-item> -->
              <vmenu-item link="/LuckyBalls/Commission">
                Commission Report
              </vmenu-item>
            </vsub-menu>
            <vsub-menu title="Casino" icon="ti-game">
              <vmenu-item link="/Casino/Games"> Casino Games </vmenu-item>
              <vmenu-item link="/Casino/TopGames"> Top Games </vmenu-item>
            </vsub-menu>
            <vsub-menu
              title="Player Management"
              v-permission="'Player Management'"
              icon="ti-user"
            >
              <vmenu-item link="/PlayerManagement/PlayerSearch">
                Player Search
              </vmenu-item>
              <!-- <vmenu-item link="/PlayerManagement/PlayerMassUpdate">
                            Player Mass Update
                        </vmenu-item>-->
              <vmenu-item
                v-permission="'Player Segmentation'"
                link="/PlayerManagement/PlayerSegmentation"
              >
                Player Segmentation
              </vmenu-item>
              <!-- <vmenu-item link="/PlayerManagement/PlayerActivityReport">
                            Player Activity Report
                        </vmenu-item> -->
              <vmenu-item link="/PlayerManagement/OnlinePlayersReport">
                Online Players Report
              </vmenu-item>
              <!-- <vmenu-item link="/PlayerManagement/PlayerLiabilityReport">
                            Player Liability Report
                        </vmenu-item> -->
              <vmenu-item link="/PlayerManagement/InactivePlayersReport">
                Inactive Players Report
              </vmenu-item>
              <vmenu-item link="/PlayerManagement/FrozenAccountsReport">
                Frozen Account Report
              </vmenu-item>
            </vsub-menu>
            <vsub-menu
              title="Network"
              v-permission="'Network'"
              icon="fa fa-sitemap fa-2x"
            >
              <vmenu-item link="/Network/AgencyList"> Agency List </vmenu-item>
              <vmenu-item link="/Network/PendingReq">
                Pending Requests
              </vmenu-item>
              <vmenu-item link="/Network/NewAgent"> Add New Agent </vmenu-item>

              <!-- <vmenu-item link="/Network/CommissionReporting" v-permission="'Commission'">
              Commission Reporting
            </vmenu-item> -->
              <vmenu-item
                link="/Network/Settings"
                v-permission="'Network settings'"
              >
                Settings
              </vmenu-item>
            </vsub-menu>

            <vmenu-item link="/Cashflows/CashBooks" icon="ti-exchange-vertical">
              &nbsp; Cashflow
            </vmenu-item>

            <vsub-menu
              title="Banking"
              v-permission="'Banking'"
              icon="ti-exchange-vertical"
            >
              <vmenu-item link="/Banking/OperationBalanceTransfer">
                Operation Accounts/Transfer
              </vmenu-item>
              <vmenu-item link="/Banking/DepositsWithdrawalsManager">
                Deposite/Withdrawals Manager
              </vmenu-item>
            </vsub-menu>

            <vsub-menu
              title="Bonuses"
              v-permission="'Bonus Setup'"
              icon="ti-gift"
            >
              <!-- <vmenu-item link="/reporting">
                            Promotions
                        </vmenu-item>
                        <vmenu-item link="/reporting/gaming-activity">
                            Create Promotions
                        </vmenu-item>-->
              <vmenu-item link="/Bonuses/List"> Bonuses </vmenu-item>
              <vmenu-item link="/Bonuses/BonusOnTickets">
                Multibet Bonus
              </vmenu-item>
              <vmenu-item
                link="/Bonuses/CashOut"
                v-permission="'Cashout Settings'"
              >
                CashOut
              </vmenu-item>
              <vmenu-item link="/Bonuses/CutX" v-permission="'Cut X settings'">
                CUT (X)
              </vmenu-item>
              <!-- <vmenu-item link="/reporting/logins-history">
                            Grant Mass Bonuses
                        </vmenu-item>
                        <vmenu-item link="/reporting/net-cash">
                            Mass Free Spins
                        </vmenu-item> -->
              <vmenu-item link="/Bonuses/PlayerReports">
                Player Bonuses Report
              </vmenu-item>
              <!--<vmenu-item link="/reporting/money-transactions">
                            Player Spins Report
                        </vmenu-item> -->
            </vsub-menu>
            <vsub-menu
              title="Jackpots"
              v-permission="'Jackpot'"
              icon="ti-medall"
            >
              <vmenu-item link="/ContentManagement/Jackpots/WeeklyJackpots">
                Weekly Jackpots
              </vmenu-item>
              <vmenu-item link="/ContentManagement/Jackpots/TicketJackpots">
                Ticket Jackpots
              </vmenu-item>
              <vmenu-item link="/ContentManagement/Jackpots/AddNew">
                Create new Jackpot
              </vmenu-item>
              <vmenu-item link="/ContentManagement/Jackpots/Tickets">
                Tickets
              </vmenu-item>
            </vsub-menu>
            <vsub-menu
              v-permission="'Communications'"
              title="Communications"
              icon="ti-comment-alt"
            >
              <vmenu-item link="/Communications/PlayerMessages">
                Player Messages
              </vmenu-item>
              <vmenu-item link="/Communications/NetworkMessages">
                Network Messages
              </vmenu-item>
              <vmenu-item link="/Communications/MassInboxMessages">
                Mass Inbox Messages
              </vmenu-item>
            </vsub-menu>

            <vsub-menu
              title="Risk Management"
              v-permission="'Odds Management'"
              icon="ti-list"
            >
              <vmenu-item
                link="/RiskManagement/BettingParameters"
                v-permission="'Network settings'"
              >
                Betting Parameters
              </vmenu-item>
              <vmenu-item link="/RiskManagement/Liability">
                Liability
              </vmenu-item>
              <vmenu-item link="/RiskManagement/Profitability">
                Profitability
              </vmenu-item>
              <vmenu-item link="/ContentManagement/BookOdds">
                Manual Odds Adjustment
              </vmenu-item>
              <vmenu-item link="/ContentManagement/Events">
                Events & Odds Margins
              </vmenu-item>
            </vsub-menu>

            <vsub-menu
              title="Pools Management"
              v-permission="'Odds Management'"
              icon="ti-list"
            >
              <vmenu-item link="/Pools/Fixtures"> Fixtures </vmenu-item>
              <vmenu-item link="/Pools/SalesOverview"> Tickets </vmenu-item>
              <vmenu-item link="/Pools/CouponSales">
                Coupon Tickets
              </vmenu-item>
            </vsub-menu>
            <vsub-menu
              v-permission="'Content Management'"
              title="Content Management"
              icon="ti-agenda"
            >
              <vmenu>
                <vmenu-item link="/ContentManagement/SiteMenu">
                  Site Menu
                </vmenu-item>
                <vmenu-item link="/ContentManagement/SportsMenu">
                  Sports Menu
                </vmenu-item>
                <vmenu-item link="/ContentManagement/Pages/List">
                  Pages
                </vmenu-item>
                <vmenu-item link="/ContentManagement/Banners/List">
                  Banners
                </vmenu-item>
                <vmenu-item link="/ContentManagement/MarketsManager">
                  Markets Manager
                </vmenu-item>
                <vmenu-item link="/ContentManagement/WeeklyCoupon">
                  Weekly Coupon
                </vmenu-item>
                <vmenu-item link="/ContentManagement/TopBets">
                  Top Bets
                </vmenu-item>
              </vmenu>
            </vsub-menu>
            <vsub-menu
              v-permission="'Configurations'"
              title="Configurations"
              icon="ti-settings"
            >
              <vmenu-item link="/Settings" v-permission="'General settings'">
                General
              </vmenu-item>

              <vmenu-item
                link="/Settings/CommissionSettings"
                v-permission="'General settings'"
              >
                Commmision Setting
              </vmenu-item>

              <vmenu-item
                link="/Settings/PaymentMethods"
                v-permission="'General settings'"
              >
                Payment Methods
              </vmenu-item>
              <vmenu-item
                link="/Settings/Tipsters"
                v-permission="'Tipster Settings'"
              >
                Tipsters Settings
              </vmenu-item>
              <vmenu-item
                link="/Settings/ExposureMonitor"
                v-permission="'Exposure Monitor Settings'"
              >
                Exposure Monitor Settings
              </vmenu-item>
            </vsub-menu>
            <vsub-menu
              v-permission="'User Management'"
              title="User Management"
              icon="ti-user"
            >
              <vmenu-item
                link="/UserManagement/Users"
                v-permission="'User Management'"
              >
                Users
              </vmenu-item>
              <vmenu-item
                link="/UserManagement/RolesPermissions"
                v-permission="'Roles and Permissions'"
              >
                Roles & Permissions
              </vmenu-item>
            </vsub-menu>
            <vmenu-item link="/OnlineHelp" icon="ti-info">
              &nbsp;Online Help
            </vmenu-item>
          </vmenu>
          <!-- / .navigation -->
        </div>
        <!-- menu -->
      </section>
    </b-sidebar>
  </div>
</template>

<script>
import vmenu from "./left-side/default/menu/vueMenu";
import vsubMenu from "./left-side/default/menu/subMenu";
import vmenuItem from "./left-side/default/menu/MenuItem";
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
.b-sidebar {
  width: 215px;
  border-right: 5px solid #eeeeee;
}
.leftmenu_icon {
  font-size: 12px !important;
}
</style>
