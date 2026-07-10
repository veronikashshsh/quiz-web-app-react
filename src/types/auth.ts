import { ChangeEvent, MouseEvent } from "react";

export interface AuthFieldProps {
  label: string;
  id: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel'; 
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export interface GoogleButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export interface SignInFormProps {
  onSuccess: () => void;
  onSwitchToSignUp: () => void;
}

export interface SignUpFormProps {
  onSuccess: () => void;
  onSwitchToSignIn: () => void;
}