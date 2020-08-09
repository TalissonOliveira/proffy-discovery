const Database = require('./db.js')
const createProffy = require('./createProffy.js')


Database.then(async (db) => {
    // Inserir dados
    proffyValue = {
        name: "Diego Fernandes",
        avatar: "https://github.com/diego3g.png",
        whatsapp: "940028922",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
    }

    classValue = {
        subject: 1,
        cost: "20",
        // O proffy ID virá pelo bando de dados
    }

    classScheduleValues = [
        // class_id virá pelo banco de dados, após cadastrar a class
        {
          weekday: 1,
          time_from: 720,
          time_to: 1220
        },
        {
          weekday: 0,
          time_from: 520,
          time_to: 1220
        }
      ]

    //await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // Consultar os dados inseridos

    // Todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)

    // Consultar as classes de um determinado professor
    // e trazer junto os dados do professor
    const selectedClassesAndProffys = await db.all(`
      SELECT classes.*, proffys.*
      FROM proffys
      JOIN classes ON (classes.proffy_id = proffys.id)
      WHERE classes.proffy_id = 1;
    `)
      //console.log(selectedClassesAndProffys)

      // O horário que a pessoa trabalha, por exemplo, é das 8h até 18h
      // O horário do time_from(8h) precisa ser menor ou igual ao horário solicitado
      // O time_to precisa ser acima
      const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "1300"
        AND class_schedule.time_to > "1300"
      `)

      //console.log(selectClassesSchedules)

})