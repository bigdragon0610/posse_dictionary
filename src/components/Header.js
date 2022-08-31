import Logo from "../assets/images/posse_logo.png";
import Burger from "../assets/images/burger.svg";

const Header = ({ setIsOpen }) => {
  return (
    <header className='bg-white w-full h-16 flex'>
      <h1>
        <img
          src={Logo}
          alt='posse'
          width={160}
          className='h-16 object-contain'
        />
      </h1>
      <img
        src={Burger}
        alt='menu'
        width={24}
        className='ml-auto mr-7 cursor-pointer'
        onClick={() => setIsOpen(true)}
      />
    </header>
  );
};

export default Header;
