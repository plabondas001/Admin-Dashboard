import StatsGrid from "./StatsGrid";

const Dashboard = () => (
    <div className="space-y-6">

        {/* Stats Grid */}
        <Breadcrumb title="Dashboard" paths={["Home", "Dashboard", "Ecommerce"]} />
        <StatsGrid></StatsGrid>

    </div>
);

export default Dashboard;