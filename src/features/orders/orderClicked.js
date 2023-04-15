import React from "react";

function orderClicked() {
  const dispatch = useDispatch();
  const { userId } = useAuth();
  const quantity = useSelector((state) => state.cart.quantity);
  const cart = useSelector((state) => state.cart);
  const totalCost = cart.total;
  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken);
  const [addNewOrder, { isLoading, isSuccess, isError, error }] =
    useAddNewOrderMutation();

  const menus = cart;
  const amount = cart.total;
  const status = "Open";
  const dostavljac = "0";

  useEffect(() => {
    if (isSuccess) {
      setUserId(userId);
      setAmount(amount);
      setMenus(menus);
      navigate("/orders");
      setStatus(status);
      setDostavljac("0");
    }
  }, [isSuccess, navigate]);

  const canSave =
    [userId, amount, menus, status, dostavljac].every(Boolean) && !isLoading;

  const onSaveOrderClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewOrder({
        user: userId,
        amount,
        menus,
        status: "Open",
        dostavljac: "0",
      });
    }
  };

  return <div>orderClicked</div>;
}

export default orderClicked;
