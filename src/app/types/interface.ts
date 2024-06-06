
export interface childrenProps {
   boxChildren: React.ReactNode;
   containerChild: React.ReactNode;
   yourStyleBox?: React.CSSProperties;
   yourStyleContainer?: React.CSSProperties;
}

export interface NewPost {
   title: string;
   text: string;
   selectedOption: string
}

export interface NewPostWithOption extends NewPost {
   selectedOption: string;
   createdAt: Date;
}
export interface INewUser {
   firstName: string,
   lastName: string,
   dateOfBirth: string,
   email: string,
   password: string,
   confirmPassword: string,
   gender: string,
   phone: string,
   role: string,
   city: string,
   address: string,
   zipCode: string,
}



export interface User {
   id: number;
   firstName: string;
   lastName: string;
   email: string;
   isActivated: boolean;
   password: string;
   sex: string;
   phone: string;
   roles: string;
}

export interface AddNewPostProps {
   hide: boolean;
   setHide: React.Dispatch<React.SetStateAction<boolean>>;
   setNewPostFn: (newPostData: PostData) => void;
}

export interface PostData {
   title: string;
   text: string;
   selectedOption: string;
   createdAt: Date
}

export interface UpdatedProfile {
   firstName: string,
   lastName: string,
   dateOfBirth: Date,
   sex: string,
   city: string,
   address: string,
   zipCode: string,
   email: string,
   phone: string,
   role: string,
   isActivated: boolean,
}

export interface UpdatedPassword {
   currentPassword: string,
   newPassword: string,
   confirmPassword: string,
}

export interface EditingUser {
   firstName: string,
   lastName: string,
   sex: string,
   email: string,
   phone: string,
   role: string,
}

export interface SnackbarData {
   open: boolean;
   error: boolean;
   message?: string;
}
export interface CustomSnackbarProps {
   handleClose: () => void;
   snackbarData: { open: boolean; error: boolean; message?: string };
}