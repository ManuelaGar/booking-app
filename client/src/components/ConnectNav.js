import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Avatar, Badge } from "antd";
import moment from "moment";
import {
  getAccountBalance,
  currencyFormatter,
  payoutSetting,
} from "../actions/stripe.js";
import { SettingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const { Meta } = Card;
const { Ribbon } = Badge;

function ConnectNav() {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const { auth } = useSelector((state) => ({ ...state }));
  const { user, token } = auth;

  useEffect(() => {
    getAccountBalance(auth.token).then((res) => {
      setBalance(res.data);
    });
  }, []);

  async function handlePayoutSettings() {
    setLoading(true);
    try {
      const res = await payoutSetting(token);
      window.location.href = res.data.url;
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Unable to access settings. Please try again.");
    }
  }

  return (
    <div className="d-flex justify-content-around">
      <Card>
        <Meta
          avatar={<Avatar>{user.name[0]}</Avatar>}
          title={user.name}
          description={`Joined ${moment(user.createdAt).fromNow()}`}
        />
      </Card>
      {auth &&
        auth.user &&
        auth.user.stripe_seller &&
        auth.user.stripe_seller.charges_enabled && (
          <>
            <Ribbon text="Available" color="blue">
              <Card className="bg-light pt-1">
                {balance &&
                  balance.pending &&
                  balance.pending.map((b, index) => (
                    <span key={index} className="lead">
                      {currencyFormatter(b)}
                    </span>
                  ))}
              </Card>
            </Ribbon>

            <Ribbon text="Payouts" color="silver">
              <Card onClick={handlePayoutSettings} className="bg-light pointer">
                <SettingOutlined className="h5 pt-2" />
              </Card>
            </Ribbon>
          </>
        )}
    </div>
  );
}

export default ConnectNav;
