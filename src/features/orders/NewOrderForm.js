import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewOrderMutation } from "./ordersApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { Image } from "cloudinary-react";
import authSlice from "../auth/authSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../auth/authSlice";
import axios from "axios";

const NewOrderForm = ({ users }) => {
  const token = useSelector(selectCurrentToken);
  const [addNewOrder, { isLoading, isSuccess, isError, error }] =
    useAddNewOrderMutation();

  const navigate = useNavigate();

  const [totalCost, setTotalCost] = useState("");
  const [date, setDate] = useState("");
  const [userId, setUserId] = useState(users[0]?.id || "");

  useEffect(() => {
    if (isSuccess) {
      setTotalCost("");
      setDate("");
      setUserId("");
      navigate("/orders");
    }
  }, [isSuccess, navigate]);

  const onTotalCostChanged = (e) => setTotalCost(e.target.value);
  const onDateChanged = (e) => setDate(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave = [totalCost, date, userId].every(Boolean) && !isLoading;

  const onSaveOrderClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewOrder({ user: userId, totalCost, date });
    }
  };

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validTotalCostClass = !totalCost ? "form__input--incomplete" : "";
  const validDateClass = !date ? "form__input--incomplete" : "";

  const content = (
    <>
      * <p className={`error-message ${errClass}`}>{error?.data?.message}</p>
      <form className="order-form" onSubmit={onSaveOrderClicked}>
        <h2 className="form-title">New Order</h2>
        <div className="form-row">
          <label htmlFor="totalCost">TotalCost</label>
          <input
            type="text"
            id="totalCost"
            value={totalCost}
            onChange={onTotalCostChanged}
            className={`form-input ${validTotalCostClass}`}
          />
        </div>
        <div className="form-row">
          <label htmlFor="date">Date</label>
          <textarea
            id="date"
            value={date}
            onChange={onDateChanged}
            className={`form-input form

Hariz Kasumović
go on
-input--date ${validDateClass}`}
          />
        </div>
        <div className="form-row">
          <label htmlFor="username">Assigned To:</label>
          <select
            id="username"
            value={userId}
            onChange={onUserIdChanged}
            className="form-select"
          >
            {options}
          </select>
          <button onClick={onSaveOrderClicked}>Submit</button>
        </div>
      </form>
    </>
  );

  return content;
};

export default NewOrderForm;
