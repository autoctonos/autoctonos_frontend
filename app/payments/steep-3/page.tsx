import PaymentsLayout from "@/components/layout/payment-gateway";
import SideBarPayments from "@/components/payment_gateway/side-bar";

export default function DashboardPage() {

    return (
        <PaymentsLayout>
            <div className="flex flex-row gap-5">
                hola
                <SideBarPayments />
            </div>



        </PaymentsLayout>
    )
}