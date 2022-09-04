import { FaGithub } from 'react-icons/fa'

export const Footer = () => {
  return (
    <a href="https://github.com/fkmurphy" className="flex justify-center text-sm text-gray-800 dark:text-gray-400 group">{`Created by   `}
      <span className="ml-1 text-amber-300 group-hover:text-amber-500">
        <FaGithub className="inline mr-1" />
        {`Julian Murphy`}
      </span>
    </a>
  )
}
