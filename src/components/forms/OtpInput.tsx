import React, { useEffect, useRef } from "react";

type PartialInputProps = Pick<
  React.ComponentPropsWithoutRef<"input">,
  "className" | "style"
>;

type Props = {
  value: string;
  onChange(value: string): void;

  size?: number;

  validationPattern?: RegExp;
} & PartialInputProps;

const OtpInput = (props: Props) => {
  const {
    size = 8,
    validationPattern = /[0-9]{1}/,
    value,
    onChange,
    className,
    ...restProps
  } = props;

  const ref = useRef<HTMLInputElement>();

  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, [ref.current]);

  const arr = new Array(size).fill("-");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const elem = e.target;
    const val = e.target.value;

    if (!validationPattern.test(val) && val !== "") return;

    const valueArr = value.split("");
    valueArr[index] = val;
    const newVal = valueArr.join("").slice(0, 8);
    onChange(newVal);

    if (val) {
      const next = elem.nextElementSibling as HTMLInputElement | null;
      next?.focus();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const current = e.currentTarget;
    if (e.key === "ArrowLeft" || e.key === "Backspace") {
      const prev = current.previousElementSibling as HTMLInputElement | null;
      prev?.focus();
      prev?.setSelectionRange(0, 1);
      return;
    }

    if (e.key === "ArrowRight") {
      const prev = current.nextSibling as HTMLInputElement | null;
      prev?.focus();
      prev?.setSelectionRange(0, 1);
      return;
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const val = e.clipboardData.getData("text").substring(0, size);
    onChange(val);
  };

  return (
    <div className="flex gap-2 justify-center" dir="ltr">
      {arr.map((_, index) => {
        return (
          <input
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ref={index === 0 ? (ref as any) : null}
            key={index}
            {...restProps}
            className={
              className ||
              `appearance-none focus:outline-none focus:ring-0  rounded-lg border border-stone-300 text-gray-900  focus:border-primary-100 bg-white   
              w-1/6 
              max-w-14
              text-xl md:text-3xl text-center
                aspect-square
                dark:bg-IGray-600/30
                dark:border-IGray-600
              `
            }
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern={validationPattern.source}
            maxLength={6}
            value={value.at(index) ?? ""}
            onChange={(e) => handleInputChange(e, index)}
            onKeyUp={handleKeyUp}
            onPaste={handlePaste}
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
