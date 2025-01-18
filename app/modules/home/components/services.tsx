import { SpinningText } from "@/components/spinning-text";
import { Button } from "@/components/ui/button";

const services: {
  title: string;
  description: string;
  image: [ImageSource, ImageSource];
}[] = [
  {
    title: "Professional Makeup Training",
    description:
      "Lorem ipsum dolor sit amet consectetur. Orci viverra vulputate libero vitae nulla tincidunt sed.",
    image: [
      {
        src: "/service-img-1.webp",
        alt: "Service 1",
      },
      {
        src: "/service-img-2.webp",
        alt: "Service 2",
      },
    ],
  },
  {
    title: "The bridal experience",
    description:
      "Lorem ipsum dolor sit amet consectetur. Orci viverra vulputate libero vitae nulla tincidunt sed.",
    image: [
      {
        src: "/service-3.webp",
        alt: "Service 1",
      },
      {
        src: "/service-4.webp",
        alt: "Service 2",
      },
    ],
  },
  {
    title: "1:1 diy makeup training",
    description:
      "Lorem ipsum dolor sit amet consectetur. Orci viverra vulputate libero vitae nulla tincidunt sed.",
    image: [
      {
        src: "/service-img-2.webp",
        alt: "Service 1",
      },
      {
        src: "/diy.webp",
        alt: "Service 2",
      },
    ],
  },
  {
    title: "Studio Session",
    description:
      "Lorem ipsum dolor sit amet consectetur. Orci viverra vulputate libero vitae nulla tincidunt sed.",
    image: [
      {
        src: "/service-5.webp",
        alt: "Service 1",
      },
      {
        src: "/service-5-alt.webp",
        alt: "Service 2",
      },
    ],
  },
];

export default function Services() {
  return (
    <div className="w-full pb-20 space-y-28">
      <div className="grid grid-cols-3 contain py-28 gap-14">
        <div className="col-span-1 h-[320px] flex flex-col">
          <h2 className="text-6xl text-brand-dark font-abiah tracking-[0.02em]">
            What we do
          </h2>

          <div className="mt-auto space-y-5">
            <p>
              Lorem ipsum dolor sit amet consectetur. Orci viverra vulputate
              libero vitae nulla tincidunt sed.{" "}
            </p>
            <Button>Book an appointment</Button>
          </div>
        </div>

        <div className="h-[320px] relative w-full">
          <img
            src="/makeup.webp"
            alt=""
            className="object-cover w-full h-full"
          />

          <SpinningText
            radius={5}
            fontSize={1.2}
            className="absolute bottom-0 right-0 font-medium text-white mix-blend-difference"
          >
            {`services • we • offer • `}
          </SpinningText>
        </div>
      </div>

      <div className="grid grid-cols-3">
        <div></div>
        <div className="col-span-2">
          {services.map((service, i) => (
            <RevealImageListItem
              key={service.title}
              text={service.title}
              images={service.image}
              id={i + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";

interface ImageSource {
  src: string;
  alt: string;
}

interface ShowImageListItemProps {
  text: string;
  images: [ImageSource, ImageSource];
  id: number;
}

function RevealImageListItem({ text, images, id }: ShowImageListItemProps) {
  const container = "absolute right-1/3 -top-5 z-40 h-52 w-26";
  const effect =
    "relative duration-500 delay-100 shadow-none group-hover:shadow-xl scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 group-hover:w-full group-hover:h-full w-16 h-16 overflow-hidden transition-all rounded-none";

  return (
    <div className="relative flex items-center w-full gap-4 py-8 overflow-visible group h-fit">
      <div>
        <p className="text-3xl font-medium">/0{id}</p>
      </div>

      <div className="flex-1 space-y-2 text-[#C9C1C5] group-hover:text-brand-dark">
        <p className="text-lg font-medium uppercase transition-all duration-500 text-foreground">
          {text}
        </p>

        <div className="h-0.5 w-full bg-[#C9C1C5] group-hover:bg-brand-dark transition-all duration-300"></div>

        <p className="text-brand-dark">
          Lorem ipsum dolor sit amet consectetur. <br /> Orci viverra vulputate
          libero vitae nulla tincidunt sed.
        </p>

        <div
          className={cn(
            container,
            "translate-x-0 -translate-y-10 rotate-0 transition-all duration-500 group-hover:-translate-x-6 -group-hover:-translate-y-6 group-hover:-rotate-12"
          )}
        >
          <div className={effect}>
            <img
              alt={images[1].alt}
              src={images[1].src}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div
          className={cn(
            container,
            "translate-x-0 -translate-y-10 rotate-0 transition-all delay-150 duration-500 group-hover:translate-x-14 group-hover:-translate-y-6 group-hover:rotate-12"
          )}
        >
          <div className={cn(effect, "duration-200")}>
            <img
              alt={images[0].alt}
              src={images[0].src}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <svg
          width="32"
          height="33"
          viewBox="0 0 32 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute z-40 transition-all right-8 top-20"
        >
          <g clipPath="url(#clip0_132_137)">
            <path
              d="M23.586 7.19265H18C18 7.19265 17.878 7.19065 17.777 7.16765C17.216 7.03965 16.849 6.35665 17.076 5.80965C17.211 5.48165 17.533 5.23865 17.888 5.19865C17.937 5.19265 17.95 5.19365 18 5.19265H26C26.019 5.19265 26.037 5.19365 26.056 5.19365C26.106 5.19765 26.118 5.19765 26.167 5.20665C26.59 5.27765 26.945 5.64565 26.994 6.08065C26.999 6.12965 26.999 6.14265 27 6.19265V14.1926C26.981 14.8536 26.257 15.3816 25.617 15.1166C25.29 14.9806 25.046 14.6586 25.006 14.3046C25.001 14.2546 25.001 14.2426 25 14.1926V8.60665L6.706 26.9006C6.648 26.9466 6.594 27.0006 6.531 27.0396C6.03 27.3546 5.266 27.1256 5.055 26.5236C4.956 26.2396 4.992 25.9156 5.152 25.6616C5.192 25.5976 5.245 25.5446 5.292 25.4856L23.586 7.19265Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_132_137">
              <rect
                width="32"
                height="32"
                fill="white"
                transform="matrix(-1 0 0 -1 32 32.1868)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}
