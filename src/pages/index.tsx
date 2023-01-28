import styles from "./index.module.scss";
import { type NextPage } from "next";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { HeyloButton, HeyloHref, HeyloInput, HeyloLoader, HeyloLogo, HeyloSnackbar } from "@/components";
import { env } from "@/env/client.mjs";
import { addHttpPrefix } from "@/utils/common-utils";

const Home: NextPage = () => {

  const router = useRouter();
  const [hasCopied, setCopied] = useState(false);
  const urlLink = useRef<HTMLInputElement>();

  const { isLoading, data, error, mutate  } = api["short-links"].createShortLink.useMutation();

  const handleCreateLink = () => {
    const inputVal = urlLink?.current?.value || '';
    if(!inputVal.trim()) {
      return;
    }
    mutate({ url: addHttpPrefix(inputVal)});
  }

  const handleCopyText = () => {
    if (data?.slug) {
      setCopied(true);
      const url = `${env.NEXT_PUBLIC_APP_HOST_URL}${data.slug}`;
      void navigator.clipboard.writeText(url);
    }
  }

  const handleJoin = () => {
    void router.push('/register');
  }

  return (
    <>
      <main className={styles['container']}>
        <div className={styles['header']}>
          <HeyloLogo text="Heylo Link" />
          <HeyloHref
            fontSize="24px"
            href="/register"
            text="Register"
            target={'_self'}
          />
        </div>
        <div className={styles['main-content']}>
          <h1 className={styles['title']}> Short URLs and Landing pages </h1>
          <div className={styles['form-container']}>
            <HeyloInput
              input={{
                placeholder: 'URL to short | e.g: https://heylo.link',
                ref: urlLink,
              }}
            ></HeyloInput>

            <HeyloButton
              onClick={handleCreateLink}
              color="PRIMARY"
              label="GENERATE"
              height={'60px'}
            />
          </div>

          {isLoading && (
            <div className={styles['loading-indicator']}>
              <HeyloLoader />
            </div>
          )}

          {data?.slug && (
            <div className={styles['terminal']} onClick={handleCopyText}>
              <pre>{`${env.NEXT_PUBLIC_APP_HOST_URL}${data.slug}`}</pre>
            </div>
          )}

          {error && (
            <div className={styles['terminal']}>
              <pre> Please enter a valid URL </pre>
            </div>
          )}

          <p className={styles['sub-title']}>
            Want to create custom short URLs and personal landing page?
          </p>
          <div className={styles['action']}>
            <HeyloButton
              width="248px"
              color="SECONDARY"
              label="Join now"
              height={'60px'}
              onClick={handleJoin}
            />
          </div>
        </div>
      </main>
      <HeyloSnackbar
        duration={5000}
        message="Short URL copied to clipboard!"
        isOpen={hasCopied}
        onClose={() => setCopied(false)}
      />
    </>
  );
};

export default Home;
