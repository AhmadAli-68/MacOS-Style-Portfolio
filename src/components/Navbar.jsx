import dayjs from 'dayjs'

import { navLinks, navIcons } from '@constants'

const Navbar = () => {
  return (
    <nav>
      <div>
        <img src='/images/logo.svg' alt='logo' />
        <p className='font-bold'>Ahmad's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name }) => (
            <li key={id}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img, title }) => (
            <li key={id}>
              <img src={img} className='icon' alt={title} />
            </li>
          ))}
        </ul>

        <time>{dayjs().format('ddd MMM D h:mm A')}</time>
      </div>
    </nav>
  )
}

export default Navbar