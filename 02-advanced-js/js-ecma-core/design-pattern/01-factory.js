/*
=================================================================
                                                    构造器
=================================================================


    在 JavaScript 中，我们使用构造函数去初始化对象，就是应用了构造器模式。

    在这个构造器模式中：
        - 变的是每个 user 的姓名、年龄、工种这些值，这是用户的个性；
        - 不变的是每个员工都具备姓名、年龄、工种这些属性，这是用户的共性。

    构造器将 name、age、career 赋值给对象的过程封装，确保了每个对象都
    具备这些属性，确保了共性的不变，同时将 name、age、career 各自的取
    值操作开放，确保了个性的灵活
 */
function User(name, age, career) {
    this.name = name
    this.age = age
    this.career = career
}

/*
=================================================================
                                                    工厂模式
=================================================================
如果在使用构造器模式的时候，我们本质上是去抽象了每个对象实例的变与
不变。那么使用工厂模式时，我们要做的就是去抽象不同构造函数（类）之
间的变与不变。
*/
function User2(name, age, career, work) {
    this.name = name
    this.age = age
    this.career = career
    this.work = work
}

function User2Factory(name, age, career) {
    let work
    switch (career) {
        case 'coder':
            work = ['写代码', '写系分', '修Bug']
            break
        case 'product manager':
            work = ['订会议室', '写PRD', '催更']
            break
        case 'boss':
            work = ['喝茶', '看报', '见客户']
            break
        default:
            break
    }

    return new User(name, age, career, work)
}