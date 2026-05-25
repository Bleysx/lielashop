import InstagramIcon from "../icons/InstagramIcon";
import FacebookIcon from "../icons/FacebookIcon";

export default function Footer() {
  return (
<footer className=" bg-white py-8 text-center space-y-3">
        <p className="font-semibold">Lielashop Makeup</p>
  
        <div className="flex justify-center gap-4 pt-2">
          <a href="https://www.instagram.com/lielashop_makeup" target="_blank">
            <InstagramIcon />
          </a>
          <a href="https://www.facebook.com/people/Lielashop-Make-Up/61578019997912/?rdid=ZxbPrJxpS2yhKUal&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18WPPxJimF%2F" target="_blank">
            <FacebookIcon />
          </a>
        </div>
      </footer>
        );
}