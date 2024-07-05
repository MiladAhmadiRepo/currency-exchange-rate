import { UnitTestBed } from '@automock/core/dist/public-types'
import { TestBed } from '@automock/jest'
import { Type } from '@nestjs/common'

export type MockedSimulate<T1, T2> = {
  inputsParam: T1
  output: T2
}

export class JestMockeds<T> {
  private services: UnitTestBed<T>
  constructor(private readonly type: Type) {
    this.services = TestBed.create(type).compile()
    ;(this.services.unitRef as any).mocksContainer.identifierToMocksTuples.forEach((elem, i) => {
      this[Object.keys(this.services.unit)[i]] = this.services.unitRef.get(elem[0].identifier)
    })
  }

  [key: string]: jest.Mocked<any>

  getUnit() {
    return this.services.unit
  }
  getUnitRef() {
    return this.services.unitRef
  }

  getInectionService<T1>(key: string): jest.Mocked<T1> {
    return this[key] as jest.Mocked<T1>
  }

  fillInectionService<T, OUTPUT>(key: string, methodName: string, output: OUTPUT): jest.Mocked<T> {
    const retVal = this[key] as jest.Mocked<T>
    retVal[methodName].mockResolvedValue(output)
    return retVal
  }
}
