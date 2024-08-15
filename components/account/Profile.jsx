import edit2 from "@/public/assets/icons/outline/edit-2.svg";
import { useState, useTransition } from "react";
import Input from "@/components/reusable/Input";
import Button from "@/components/Button";
import { auth } from "@/lib/firebaseConfig";
import { updateProfile } from "firebase/auth";

const Profile = ({ user }) => {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({
    displayName: user.displayName,
    gender: "f",
    NCN: "f",
    phoneNumber: user.phoneNumber,
  });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      if (user.displayName === data.displayName) {
        setEdit(false);
        return;
      }
      await updateProfile(auth.currentUser, {
        displayName: data.displayName,
      }).then(() => {
        setEdit(false);
      });
    });
  };
  return (
    <>
      {!edit && (
        <div className="rounded-[8px] h-fit  border border-gray-4 p-[24px] flex justify-between">
          <div className="grid grid-cols-2 gap-x-[16px] gap-y-[24px] mb-[16px]">
            <div className="min-w-[220px] flex flex-col gap-[4px]">
              <h2 className="text-gray-6 body-md">الاسم</h2>
              <p className="h7 text-gray-8">{user.displayName}</p>
            </div>
            <div className="min-w-[220px] flex flex-col gap-[4px]">
              <h2 className="text-gray-6 body-md">الجنس</h2>
              <p className="h7 text-gray-8">{"F"}</p>
            </div>
            <div className="min-w-[220px] flex flex-col gap-[4px]">
              <h2 className="text-gray-6 body-md">الرقم الوطني</h2>
              <p className="h7 text-gray-8" style={{ direction: "ltr" }}>
                2039238421
              </p>
            </div>
            <div className="min-w-[220px] flex flex-col gap-[4px]">
              <h2 className="text-gray-6 body-md">رقم الهاتف</h2>
              <p className="h7 text-gray-8" style={{ direction: "ltr" }}>
                {user.phoneNumber}
              </p>
            </div>
          </div>
          <div
            className="text-main px-[16px] py-[8px] flex gap-[8px] items-center h-fit cursor-pointer"
            onClick={() => setEdit(true)}
          >
            <img src={edit2.src} alt="edit" className="w-[24px] h-[24px]" />
            <p className="body-lg ">تعديل</p>
          </div>
        </div>
      )}
      {edit && (
        <div className="rounded-[8px] h-fit border border-gray-4 p-[24px] flex flex-col gap-[32px]">
          <div className="grid grid-cols-2 gap-x-[20px] gap-y-[32px]">
            <Input
              placeholder={"الاسم الكامل"}
              size={"h-[40px]"}
              value={data.displayName}
              setValue={(value) => setData({ ...data, displayName: value })}
            />
            <Input
              placeholder={"الجنس"}
              size={"h-[40px]"}
              value={data.gender}
              setValue={(value) => setData({ ...data, gender: value })}
            />
            <Input
              placeholder={"الرقم الوطني"}
              size={"h-[40px]"}
              value={data.NCN}
              setValue={(value) => setData({ ...data, NCN: value })}
            />
            <Input
              placeholder={"رقم الهاتف"}
              size={"h-[40px]"}
              value={data.phoneNumber}
              setValue={(value) => setData({ ...data, phoneNumber: value })}
            />
          </div>
          <div className="flex justify-end">
            <Button
              size={"h-[40px]"}
              color={!isPending ? "bg-main" : "bg-gray-2"}
              text_color={!isPending ? "text-white" : "text-gray-5"}
              style={
                isPending
                  ? "w-[200px] flex justify-center cursor-not-allowed"
                  : "w-[200px] flex justify-center"
              }
              text={"حفظ"}
              action={() => handleSubmit()}
              disabled={isPending}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
