import React from "react";
import "./add_button.scss";
import { IoMdAddCircle } from "react-icons/io";
// import { addVideoToPlayList } from "../../api/firebase/utils";
import { connect } from "react-redux";
import { addVideoStart } from "../../redux/user/user.actions";
export const AddButton = (props) => {
  const { video, user, addVideoStart } = props;

  return (
    <IoMdAddCircle
      onClick={async () => {
        addVideoStart(user, video);
      }}
      className="add-button"
    ></IoMdAddCircle>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addVideoStart: (user, video) => dispatch(addVideoStart(user, video)),
});
export default connect(null, mapDispatchToProps)(AddButton);
