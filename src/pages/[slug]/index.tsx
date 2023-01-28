import { type NextPage } from "next";
import { useRouter } from "next/router";

import { api } from "@/utils/api";
import { addHttpPrefix, isDataNotEmpty } from "@/utils/common-utils";
import { HeyloScreenLoader } from "@/components";

const SlugPage: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  api["short-links"].getShortLink.useQuery(slug as string, {
    enabled: isDataNotEmpty(slug),
    onSuccess: (shortLink) => {
      if (shortLink?.url) {
        window.location.href = addHttpPrefix(shortLink.url);
        return;
      }
      return void router.push("/404");
    },
    onError: () => {
        return void router.push("/404");
    },
  });

  return < > { <HeyloScreenLoader /> } </>
};

export default SlugPage;
