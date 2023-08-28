/* eslint-disable no-unused-vars */
/* eslint-disable no-extra-semi */
import Headers from "./Header";
import CartOverview from "../features/cart/CartOverview";
import Loader from "./Loader";
import { Outlet, useNavigation } from "react-router-dom";

function AppLayout() {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";

    return (
        <div className="grid h-screen grid-rows-[auto_1fr_auto]">
            <Headers />
            <div className="overflow-scroll">
                <main className="mx-auto max-w-3xl relative">
                    {isLoading && <Loader />}
                    <Outlet />
                </main>
            </div>

            <CartOverview />
        </div>
    );
};

export default AppLayout;
