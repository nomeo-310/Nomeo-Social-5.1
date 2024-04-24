import { IconType } from "react-icons"

type navItemProps = {
  name: string
  icon: IconType
  active?: boolean
  onClick: () => void
}

const NavItem = ({name, icon:Icon, active, onClick}:navItemProps) => {
  return (
    <button className={'flex items-center gap-2 capitalize lg:text-lg lg:px-4 px-3 ' + (active ? 'border-b-4 border-green-600 text-green-600 font-semibold ': 'border-b-4 border-gray-100')} onClick={onClick}>
      <div className="hidden md:block">
        <Icon size={22}/>
      </div>
      <div className="md:hidden">
        <Icon size={18}/>
      </div>
      <h2>{name}</h2>
    </button>
  )
}

export default NavItem